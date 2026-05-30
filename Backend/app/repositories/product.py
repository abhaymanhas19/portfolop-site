"""Repository layer for ProductProfile, ProductCarousel, and ProductImage database operations."""
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.product import ProductProfile, ProductCarousel, ProductImage

class ProductRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all_profiles(self) -> List[ProductProfile]:
        """Fetch all product profiles along with carousels and images."""
        result = await self.session.execute(
            select(ProductProfile).options(
                selectinload(ProductProfile.carousels),
                selectinload(ProductProfile.images)
            )
        )
        return list(result.scalars().all())

    async def get_profile_by_id(self, profile_id: int) -> Optional[ProductProfile]:
        """Fetch a single product profile by database ID."""
        result = await self.session.execute(
            select(ProductProfile)
            .where(ProductProfile.id == profile_id)
            .options(
                selectinload(ProductProfile.carousels),
                selectinload(ProductProfile.images)
            )
        )
        return result.scalars().first()

    async def create_profile(self, profile: ProductProfile) -> ProductProfile:
        """Create a new product profile."""
        self.session.add(profile)
        await self.session.commit()
        await self.session.refresh(profile)
        return profile

    async def update_profile(self, profile: ProductProfile) -> ProductProfile:
        """Update an existing product profile."""
        self.session.add(profile)
        await self.session.commit()
        await self.session.refresh(profile)
        return profile

    async def delete_profile(self, profile: ProductProfile) -> None:
        """Delete a product profile."""
        await self.session.delete(profile)
        await self.session.commit()

    async def get_carousel_by_id(self, carousel_id: int) -> Optional[ProductCarousel]:
        """Fetch a single product carousel item by ID."""
        result = await self.session.execute(
            select(ProductCarousel).where(ProductCarousel.id == carousel_id)
        )
        return result.scalars().first()

    async def create_carousel(self, carousel: ProductCarousel) -> ProductCarousel:
        """Create a new product carousel item."""
        self.session.add(carousel)
        await self.session.commit()
        await self.session.refresh(carousel)
        return carousel

    async def delete_carousel(self, carousel: ProductCarousel) -> None:
        """Delete a product carousel item."""
        await self.session.delete(carousel)
        await self.session.commit()

    async def get_image_by_id(self, image_id: int) -> Optional[ProductImage]:
        """Fetch a single product image item by ID."""
        result = await self.session.execute(
            select(ProductImage).where(ProductImage.id == image_id)
        )
        return result.scalars().first()

    async def create_image(self, image: ProductImage) -> ProductImage:
        """Create a new product image item."""
        self.session.add(image)
        await self.session.commit()
        await self.session.refresh(image)
        return image

    async def delete_image(self, image: ProductImage) -> None:
        """Delete a product image item."""
        await self.session.delete(image)
        await self.session.commit()
