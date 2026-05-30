"""Cloudflare Stream service implementation for video streaming and hosting."""
import logging
from typing import Any, Dict, Optional
import httpx
from fastapi import HTTPException
from app.config import settings

logger = logging.getLogger(__name__)

class CloudflareStreamService:
    def __init__(self) -> None:
        self.account_id = settings.cf_stream_account_id
        self.api_token = settings.cf_stream_api_token
        self.is_configured = all([self.account_id, self.api_token])
        self.base_url = f"https://api.cloudflare.com/client/v4/accounts/{self.account_id}/stream"
        
        if not self.is_configured:
            logger.warning("Cloudflare Stream is not fully configured. Video uploads will fail.")

    async def upload_video(self, file_content: bytes, file_name: str) -> Dict[str, Any]:
        """Uploads a video file to Cloudflare Stream using basic form-data upload."""
        if not self.is_configured:
            raise HTTPException(
                status_code=503,
                detail="Cloudflare Stream service is not configured. Please check environment variables."
            )
        headers = {
            "Authorization": f"Bearer {self.api_token}"
        }
        files = {
            "file": (file_name, file_content)
        }
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    self.base_url,
                    headers=headers,
                    files=files,
                    timeout=60.0
                )
                if response.status_code != 200:
                    logger.error(f"Cloudflare Stream upload error: {response.text}")
                    raise HTTPException(
                        status_code=response.status_code,
                        detail=f"Cloudflare Stream upload failed: {response.text}"
                    )
                result = response.json()
                if not result.get("success"):
                    errors = result.get("errors", [])
                    raise HTTPException(
                        status_code=400,
                        detail=f"Cloudflare API returned error: {errors}"
                    )
                video_data = result.get("result", {})
                return {
                    "uid": video_data.get("uid"),
                    "readyToStream": video_data.get("readyToStream"),
                    "playback": video_data.get("playback", {}),
                    "thumbnail": video_data.get("thumbnail"),
                    "preview": video_data.get("preview"),
                    "created": video_data.get("created"),
                    "duration": video_data.get("duration"),
                }
            except httpx.RequestError as e:
                logger.error(f"HTTP request error during Stream upload: {e}")
                raise HTTPException(status_code=500, detail=f"Network error during upload: {str(e)}")

    async def get_direct_upload_url(self, max_duration_seconds: int = 3600, meta: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Generates a direct upload URL for the client using Cloudflare Stream direct_upload API."""
        if not self.is_configured:
            raise HTTPException(
                status_code=553,
                detail="Cloudflare Stream service is not configured. Please check environment variables."
            )
        url = f"{self.base_url}/direct_upload"
        headers = {
            "Authorization": f"Bearer {self.api_token}"
        }
        payload = {
            "maxDurationSeconds": max_duration_seconds,
            "meta": meta or {}
        }
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    url,
                    headers=headers,
                    json=payload,
                    timeout=10.0
                )
                if response.status_code != 200:
                    logger.error(f"Cloudflare Stream direct upload error: {response.text}")
                    raise HTTPException(
                        status_code=response.status_code,
                        detail=f"Failed to generate direct upload URL: {response.text}"
                    )
                result = response.json()
                if not result.get("success"):
                    errors = result.get("errors", [])
                    raise HTTPException(
                        status_code=400,
                        detail=f"Cloudflare API returned error: {errors}"
                    )
                res_data = result.get("result", {})
                return {
                    "uploadURL": res_data.get("uploadURL"),
                    "uid": res_data.get("uid"),
                    "watermark": res_data.get("watermark"),
                }
            except httpx.RequestError as e:
                logger.error(f"HTTP error during Stream direct upload: {e}")
                raise HTTPException(status_code=500, detail=f"Network error during url generation: {str(e)}")

    async def delete_video(self, uid: str) -> bool:
        """Deletes a video from Cloudflare Stream."""
        if not self.is_configured:
            logger.warning("Cloudflare Stream is not configured; skipping video deletion.")
            return False
        url = f"{self.base_url}/{uid}"
        headers = {
            "Authorization": f"Bearer {self.api_token}"
        }
        async with httpx.AsyncClient() as client:
            try:
                response = await client.delete(url, headers=headers, timeout=10.0)
                if response.status_code == 200:
                    return True
                logger.error(f"Failed to delete video {uid} from Cloudflare: {response.text}")
                return False
            except httpx.RequestError as e:
                logger.error(f"HTTP error during Stream deletion: {e}")
                return False

    async def get_video_status(self, uid: str) -> Dict[str, Any]:
        """Fetches the current status and metadata of a video on Cloudflare Stream."""
        if not self.is_configured:
            raise HTTPException(
                status_code=503,
                detail="Cloudflare Stream service is not configured. Please check environment variables."
            )
        url = f"{self.base_url}/{uid}"
        headers = {
            "Authorization": f"Bearer {self.api_token}"
        }
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(url, headers=headers, timeout=10.0)
                if response.status_code != 200:
                    raise HTTPException(
                        status_code=response.status_code,
                        detail=f"Failed to get video status: {response.text}"
                    )
                result = response.json()
                if not result.get("success"):
                    errors = result.get("errors", [])
                    raise HTTPException(
                        status_code=400,
                        detail=f"Cloudflare API returned error: {errors}"
                    )
                return result.get("result", {})
            except httpx.RequestError as e:
                logger.error(f"HTTP error fetching video status: {e}")
                raise HTTPException(status_code=500, detail=f"Network error during status fetch: {str(e)}")

cloudflare_stream_service = CloudflareStreamService()
