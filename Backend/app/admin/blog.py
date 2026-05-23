"""SQLAdmin views for blog models."""

from sqladmin import ModelView

from app.admin.mixins import CloudinaryImageUploadMixin
from app.models.blog import Blog, BlogImage


class BlogAdmin(ModelView, model=Blog):
    name = "Blog"
    name_plural = "Blogs"
    column_list = [
        Blog.id,
        Blog.slug,
        Blog.title,
        Blog.category,
        Blog.date,
    ]


class BlogImageAdmin(CloudinaryImageUploadMixin, ModelView, model=BlogImage):
    name = "Blog Image"
    name_plural = "Blog Images"
    column_list = [
        BlogImage.id,
        BlogImage.blog_id,
        BlogImage.image_url,
    ]
