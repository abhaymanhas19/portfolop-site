"""Service layer for SocialLink operations and cross-check validations."""
import logging
import httpx
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
from app.repositories.social import SocialLinkRepository
from app.models.social import SocialLink
from app.schemas.social import SocialLinkCreate, SocialLinkUpdate

logger = logging.getLogger(__name__)

class SocialLinkService:
    def __init__(self, repository: SocialLinkRepository) -> None:
        self.repository = repository

    async def get_all_links(self) -> List[SocialLink]:
        """Fetch all social links."""
        return await self.repository.get_all()

    async def get_link_by_id(self, social_id: int) -> SocialLink:
        """Fetch social link by ID, raising an error if not found."""
        social_link = await self.repository.get_by_id(social_id)
        if not social_link:
            raise HTTPException(status_code=404, detail=f"Social Link with ID {social_id} not found")
        return social_link

    async def create_link(self, data: SocialLinkCreate) -> SocialLink:
        """Create a new social link."""
        social_link = SocialLink(**data.model_dump())
        return await self.repository.create(social_link)

    async def update_link(self, social_id: int, data: SocialLinkUpdate) -> SocialLink:
        """Update an existing social link."""
        social_link = await self.get_link_by_id(social_id)
        update_dict = data.model_dump(exclude_unset=True)

        for key, value in update_dict.items():
            setattr(social_link, key, value)

        return await self.repository.update(social_link)

    async def delete_link(self, social_id: int) -> None:
        """Delete a social link."""
        social_link = await self.get_link_by_id(social_id)
        await self.repository.delete(social_link)

    async def cross_check_link(self, social_id: int) -> Dict[str, Any]:
        """Verify reachability of the social link profile URL."""
        social_link = await self.get_link_by_id(social_id)
        issues = []
        checks = {}

        url_val = social_link.url
        if not url_val:
            checks["profile_url"] = "Not Configured"
        elif url_val.startswith("http://") or url_val.startswith("https://"):
            try:
                # Use standard headers to avoid blocking by some platforms (e.g. LinkedIn)
                headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
                async with httpx.AsyncClient() as client:
                    resp = await client.get(url_val, headers=headers, timeout=5.0)
                    if resp.status_code >= 400:
                        issues.append(f"Social URL returned status code {resp.status_code}")
                        checks["profile_url"] = f"Failed ({resp.status_code})"
                    else:
                        checks["profile_url"] = "Success"
            except Exception as e:
                issues.append(f"Could not reach social profile URL: {str(e)}")
                checks["profile_url"] = "Unreachable"
        else:
            checks["profile_url"] = "Skipped (Relative or Invalid URL Protocol)"

        return {
            "entity": "SocialLink",
            "entity_id": social_id,
            "platform": social_link.platform,
            "status": "Healthy" if not issues else "Needs Attention",
            "checks": checks,
            "issues": issues
        }
