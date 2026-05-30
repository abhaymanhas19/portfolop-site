"""Service layer for Blog and BlogImage operations and cross-check validations."""
import logging
import httpx
from typing import List, Dict, Any, Optional
from fastapi import HTTPException
from app.repositories.blog import BlogRepository
from app.models.blog import Blog, BlogImage
from app.schemas.blog import BlogCreate, BlogUpdate, BlogImageCreate

logger = logging.getLogger(__name__)

class BlogService:
    def __init__(self, repository: BlogRepository) -> None:
        self.repository = repository

    async def get_all_blogs(self) -> List[Blog]:
        """Fetch all blog posts."""
        return await self.repository.get_all()

    async def get_blog_by_id(self, blog_id: int) -> Blog:
        """Fetch a single blog by database ID."""
        blog = await self.repository.get_by_id(blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail=f"Blog with ID {blog_id} not found")
        return blog

    async def get_blog_by_slug(self, slug: str) -> Blog:
        """Fetch blog by slug, raising an error if not found."""
        blog = await self.repository.get_by_slug(slug)
        if not blog:
            raise HTTPException(status_code=404, detail=f"Blog with slug '{slug}' not found")
        return blog

    async def create_blog(self, data: BlogCreate) -> Blog:
        """Create a new blog post, verifying unique slug."""
        existing = await self.repository.get_by_slug(data.slug)
        if existing:
            raise HTTPException(
                status_code=400,
                detail=f"Blog with slug '{data.slug}' already exists."
            )
        blog = Blog(**data.model_dump())
        return await self.repository.create(blog)

    async def update_blog(self, blog_id: int, data: BlogUpdate) -> Blog:
        """Update an existing blog post, verifying unique slug if modified."""
        blog = await self.get_blog_by_id(blog_id)
        update_dict = data.model_dump(exclude_unset=True)

        if "slug" in update_dict and update_dict["slug"] != blog.slug:
            existing = await self.repository.get_by_slug(update_dict["slug"])
            if existing:
                raise HTTPException(
                    status_code=400,
                    detail=f"Blog with slug '{update_dict['slug']}' already exists."
                )

        for key, value in update_dict.items():
            setattr(blog, key, value)

        return await self.repository.update(blog)

    async def delete_blog(self, blog_id: int) -> None:
        """Delete a blog post along with all related image records."""
        blog = await self.get_blog_by_id(blog_id)
        
        # Delete related images first
        for image in list(blog.images):
            await self.repository.delete_image(image)

        await self.repository.delete(blog)

    async def add_blog_image(self, data: BlogImageCreate) -> BlogImage:
        """Add an image link to a blog post, verifying the blog exists."""
        if data.blog_id is not None:
            await self.get_blog_by_id(data.blog_id)
        image = BlogImage(**data.model_dump())
        return await self.repository.create_image(image)

    async def delete_blog_image(self, image_id: int) -> None:
        """Delete a blog image record."""
        image = await self.repository.get_image_by_id(image_id)
        if not image:
            raise HTTPException(status_code=404, detail=f"Blog image with ID {image_id} not found")
        await self.repository.delete_image(image)

    async def cross_check_blog(self, blog_id: int) -> Dict[str, Any]:
        """Perform validation and link connectivity cross-checks on a blog post and its assets."""
        blog = await self.get_blog_by_id(blog_id)
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

        # Check blog tags structure
        if not blog.tags:
            issues.append("Blog post has no tags specified")
            checks["tags_check"] = "Warning (No Tags)"
        else:
            checks["tags_check"] = "Success"

        # Check content length
        if not blog.content or len(blog.content.strip()) < 10:
            issues.append("Blog post content is missing or too short (must be at least 10 characters)")
            checks["content_length"] = "Failed"
        else:
            checks["content_length"] = "Success"

        # Check associated image links
        images_status = []
        for i, img in enumerate(blog.images):
            img_label = f"Image #{i+1} (ID: {img.id})"
            await check_url(img.image_url, img_label)
            images_status.append({"id": img.id, "url": img.image_url, "status": checks[img_label]})

        checks["total_images_checked"] = len(blog.images)

        return {
            "entity": "Blog",
            "entity_id": blog_id,
            "blog_title": blog.title,
            "blog_slug": blog.slug,
            "status": "Healthy" if not issues else "Needs Attention",
            "checks": checks,
            "images_detail": images_status,
            "issues": issues
        }
class_name = BlogService
