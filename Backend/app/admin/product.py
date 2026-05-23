"""SQLAdmin views for product gallery models."""

from sqladmin import ModelView

from app.models.product import ProductCarousel, ProductImage, ProductProfile


class ProductProfileAdmin(ModelView, model=ProductProfile):
    name = "Product Profile"
    name_plural = "Product Profiles"
    column_list = [
        ProductProfile.id,
        ProductProfile.name,
        ProductProfile.tagline,
    ]


class ProductCarouselAdmin(ModelView, model=ProductCarousel):
    name = "Product Carousel"
    name_plural = "Product Carousels"
    column_list = [
        ProductCarousel.id,
        ProductCarousel.profile_id,
        ProductCarousel.alt,
        ProductCarousel.media_type,
    ]


class ProductImageAdmin(ModelView, model=ProductImage):
    name = "Product Image"
    name_plural = "Product Images"
    column_list = [
        ProductImage.id,
        ProductImage.profile_id,
        ProductImage.src,
        ProductImage.title,
    ]
