"""Service layer for ProductProfile, ProductCarousel, and ProductImage operations and cross-check validations."""
import logging
import httpx
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
from app.repositories.product import ProductRepository
from app.models.product import ProductProfile, ProductCarousel, ProductImage
from app.schemas.product import (
    ProductProfileCreate, ProductProfileUpdate,
    ProductCarouselCreate, ProductImageCreate
)

logger = logging.getLogger(__name__)

class ProductService:
    def __init__(self, repository: ProductRepository) -> None:
        self.repository = repository

    async def get_all_profiles(self) -> List[ProductProfile]:
        """Fetch all product profiles."""
        return await self.repository.get_all_profiles()

    async def get_profile_by_id(self, profile_id: int) -> ProductProfile:
        """Fetch a single profile by ID, raising an error if not found."""
        profile = await self.repository.get_profile_by_id(profile_id)
        if not profile:
            raise HTTPException(status_code=404, detail=f"Product Profile with ID {profile_id} not found")
        return profile

    async def create_profile(self, data: ProductProfileCreate) -> ProductProfile:
        """Create a new product profile."""
        profile = ProductProfile(**data.model_dump())
        return await self.repository.create_profile(profile)

    async def update_profile(self, profile_id: int, data: ProductProfileUpdate) -> ProductProfile:
        """Update an existing product profile."""
        profile = await self.get_profile_by_id(profile_id)
        update_dict = data.model_dump(exclude_unset=True)

        for key, value in update_dict.items():
            setattr(profile, key, value)

        return await self.repository.update_profile(profile)

    async def delete_profile(self, profile_id: int) -> None:
        """Delete a product profile along with all linked carousels and images."""
        profile = await self.get_profile_by_id(profile_id)
        
        # Delete related carousels
        for carousel in list(profile.carousels):
            await self.repository.delete_carousel(carousel)

        # Delete related images
        for image in list(profile.images):
            await self.repository.delete_image(image)

        await self.repository.delete_profile(profile)

    async def add_carousel_item(self, data: ProductCarouselCreate) -> ProductCarousel:
        """Add a carousel item to a product profile, verifying the profile exists."""
        if data.profile_id is not None:
            await self.get_profile_by_id(data.profile_id)
        carousel = ProductCarousel(**data.model_dump())
        return await self.repository.create_carousel(carousel)

    async def delete_carousel_item(self, carousel_id: int) -> None:
        """Delete a carousel item."""
        carousel = await self.repository.get_carousel_by_id(carousel_id)
        if not carousel:
            raise HTTPException(status_code=404, detail=f"Carousel item with ID {carousel_id} not found")
        await self.repository.delete_carousel(carousel)

    async def add_image_item(self, data: ProductImageCreate) -> ProductImage:
        """Add an image item to a product profile, verifying the profile exists."""
        if data.profile_id is not None:
            await self.get_profile_by_id(data.profile_id)
        image = ProductImage(**data.model_dump())
        return await self.repository.create_image(image)

    async def delete_image_item(self, image_id: int) -> None:
        """Delete a product image item."""
        image = await self.repository.get_image_by_id(image_id)
        if not image:
            raise HTTPException(status_code=404, detail=f"Product image item with ID {image_id} not found")
        await self.repository.delete_image(image)

    async def cross_check_profile(self, profile_id: int) -> Dict[str, Any]:
        """Perform media validity checks, dimension checks, and reachability checks on profile assets."""
        profile = await self.get_profile_by_id(profile_id)
        issues = []
        checks = {}

        async def check_url(url_val: Optional[str], label: str) -> None:
            if not url_val:
                checks[label] = "Not Configured"
                return
            if url_val.startswith("http://") or url_val.startswith("https://"):
                try:
                    async with httpx.AsyncClient() as client:
                        resp = await client.head(url_val, timeout=5.0)
                        if resp.status_code >= 400:
                            resp = await client.get(url_val, timeout=5.0)
                        if resp.status_code >= 400:
                            issues.append(f"{label} URL returned status code {resp.status_code}")
                            checks[label] = f"Failed ({resp.status_code})"
                        else:
                            checks[label] = "Success"
                except Exception as e:
                    issues.append(f"Could not reach {label} URL: {str(e)}")
                    checks[label] = "Unreachable"
            else:
                checks[label] = "Skipped (Relative URL)"

        # Check primary profile image URL
        await check_url(profile.image, "Profile Primary Image URL")

        # Check Carousels
        for idx, carousel in enumerate(profile.carousels):
            c_label = f"Carousel #{idx+1} (ID: {carousel.id})"
            await check_url(carousel.src, c_label)
            if carousel.media_type not in ["image", "video"]:
                issues.append(f"{c_label} has invalid media_type '{carousel.media_type}'; expected 'image' or 'video'")

        # Check Images
        for idx, img in enumerate(profile.images):
            img_label = f"Image #{idx+1} (ID: {img.id})"
            await check_url(img.src, img_label)
            if img.width <= 0 or img.height <= 0:
                issues.append(f"{img_label} has invalid dimensions {img.width}x{img.height}; must be greater than zero")

        checks["total_carousels_checked"] = len(profile.carousels)
        checks["total_images_checked"] = len(profile.images)

        return {
            "entity": "ProductProfile",
            "entity_id": profile_id,
            "profile_name": profile.name,
            "status": "Healthy" if not issues else "Needs Attention",
            "checks": checks,
            "issues": issues
        }
