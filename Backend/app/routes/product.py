"""FastAPI router for ProductProfile, ProductCarousel, and ProductImage CRUD and cross-check endpoints."""
from fastapi import APIRouter, Depends, Path, status
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_async_session
from app.repositories.product import ProductRepository
from app.services.product import ProductService
from app.schemas.product import (
    ProductProfileResponse, ProductProfileListResponse, ProductProfileCreate, ProductProfileUpdate,
    ProductCarouselResponse, ProductCarouselCreate,
    ProductImageResponse, ProductImageCreate
)

router = APIRouter(
    prefix="/products",
    tags=["Product Profiles"]
)

def get_product_service(session: AsyncSession = Depends(get_async_session)) -> ProductService:
    repository = ProductRepository(session)
    return ProductService(repository)

@router.get("/", response_model=List[ProductProfileListResponse])
async def list_profiles(service: ProductService = Depends(get_product_service)):
    """Retrieve all product profiles."""
    return await service.get_all_profiles()

@router.get("/{id}", response_model=ProductProfileResponse)
async def get_profile(
    id: int = Path(..., description="The ID of the product profile"),
    service: ProductService = Depends(get_product_service)
):
    """Retrieve details for a single product profile by database ID."""
    return await service.get_profile_by_id(id)

@router.post("/", response_model=ProductProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_profile(
    data: ProductProfileCreate,
    service: ProductService = Depends(get_product_service)
):
    """Create a new product profile."""
    return await service.create_profile(data)

@router.put("/{id}", response_model=ProductProfileResponse)
async def update_profile(
    data: ProductProfileUpdate,
    id: int = Path(..., description="The ID of the product profile to update"),
    service: ProductService = Depends(get_product_service)
):
    """Update an existing product profile."""
    return await service.update_profile(id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_profile(
    id: int = Path(..., description="The ID of the product profile to delete"),
    service: ProductService = Depends(get_product_service)
):
    """Delete a product profile and all linked carousels and images."""
    await service.delete_profile(id)

@router.post("/{id}/cross-check", response_model=Dict[str, Any])
async def cross_check_profile(
    id: int = Path(..., description="The ID of the product profile to cross-check"),
    service: ProductService = Depends(get_product_service)
):
    """Verify primary image, carousel media paths and image dimensions."""
    return await service.cross_check_profile(id)

# --- Carousel Endpoints ---

@router.post("/carousels", response_model=ProductCarouselResponse, status_code=status.HTTP_201_CREATED)
async def add_carousel_item(
    data: ProductCarouselCreate,
    service: ProductService = Depends(get_product_service)
):
    """Add a carousel item to a product profile."""
    return await service.add_carousel_item(data)

@router.delete("/carousels/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_carousel_item(
    id: int = Path(..., description="The ID of the carousel item to delete"),
    service: ProductService = Depends(get_product_service)
):
    """Delete a carousel item."""
    await service.delete_carousel_item(id)

# --- Image Endpoints ---

@router.post("/images", response_model=ProductImageResponse, status_code=status.HTTP_201_CREATED)
async def add_image_item(
    data: ProductImageCreate,
    service: ProductService = Depends(get_product_service)
):
    """Add a detailed image item to a product profile."""
    return await service.add_image_item(data)

@router.delete("/images/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_image_item(
    id: int = Path(..., description="The ID of the product image item to delete"),
    service: ProductService = Depends(get_product_service)
):
    """Delete a detailed product image item."""
    await service.delete_image_item(id)
