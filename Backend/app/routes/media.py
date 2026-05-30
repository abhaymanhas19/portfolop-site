"""FastAPI router for Cloudflare R2 and Cloudflare Stream media uploads."""
import os
import uuid
from typing import Dict, Any
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status
from app.services.cloudflare_r2 import cloudflare_r2_service
from app.services.cloudflare_stream import cloudflare_stream_service

router = APIRouter(
    prefix="/media",
    tags=["Media Uploads"]
)

@router.post("/upload/file", status_code=status.HTTP_201_CREATED)
async def upload_file_to_r2(file: UploadFile = File(...)) -> Dict[str, str]:
    """Upload an image, document, or other asset to Cloudflare R2.

    Generates a unique UUID-based filename to prevent collision.
    """
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    
    file_ext = os.path.splitext(file.filename or "")[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    content_type = file.content_type or "application/octet-stream"
    
    public_url = cloudflare_r2_service.upload_file(
        file_content=content,
        file_name=unique_filename,
        content_type=content_type
    )
    
    return {
        "filename": file.filename or "unknown",
        "saved_name": unique_filename,
        "content_type": content_type,
        "url": public_url
    }

@router.post("/upload/video", status_code=status.HTTP_201_CREATED)
async def upload_video_to_stream(file: UploadFile = File(...)) -> Dict[str, Any]:
    """Upload a video file directly to Cloudflare Stream."""
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded video file is empty.")
        
    result = await cloudflare_stream_service.upload_video(
        file_content=content,
        file_name=file.filename or "video.mp4"
    )
    return result

@router.post("/upload/video/direct", status_code=status.HTTP_200_OK)
async def get_direct_upload_url(
    max_duration_seconds: int = Form(3600),
    video_name: str = Form("Unnamed Video")
) -> Dict[str, Any]:
    """Generate a direct creator upload URL for Cloudflare Stream.

    The client can then upload a video directly using the TUS protocol.
    """
    meta = {"name": video_name}
    result = await cloudflare_stream_service.get_direct_upload_url(
        max_duration_seconds=max_duration_seconds,
        meta=meta
    )
    return result
