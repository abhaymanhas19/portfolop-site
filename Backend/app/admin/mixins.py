"""Shared SQLAdmin behaviors."""

from typing import Any

from starlette.requests import Request
from wtforms import FileField

from app.uploaders import cloudinary_uploader


class CloudinaryImageUploadMixin:
    """Upload a file field to Cloudinary on create/update, preserving existing URLs on edit."""

    image_field_name: str = "image_url"
    form_overrides = {"image_url": FileField}

    async def on_model_change(
        self,
        data: dict,
        model: Any,
        is_created: bool,
        request: Request,
    ) -> None:
        field = self.image_field_name
        file_obj = data.get(field)

        if file_obj and hasattr(file_obj, "filename") and file_obj.filename:
            upload_result = cloudinary_uploader(file_obj)
            data[field] = upload_result.get("secure_url")
        elif not is_created and getattr(model, field, None):
            data[field] = getattr(model, field)
        else:
            data[field] = ""
