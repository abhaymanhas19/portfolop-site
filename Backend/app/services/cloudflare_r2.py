"""Cloudflare R2 S3-compatible service implementation for file storage."""
import logging
from urllib.parse import urlparse
import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException
from app.config import settings

logger = logging.getLogger(__name__)

class CloudflareR2Service:
    def __init__(self) -> None:
        self.bucket_name = settings.cf_r2_bucket_name
        self.public_url = settings.cf_r2_public_url or ""
        
        # Check configuration completeness
        self.is_configured = all([
            settings.cf_r2_access_key_id,
            settings.cf_r2_secret_access_key,
            settings.cf_r2_endpoint_url,
            self.bucket_name
        ])
        
        if self.is_configured:
            self.s3_client = boto3.client(
                service_name="s3",
                endpoint_url=settings.cf_r2_endpoint_url,
                aws_access_key_id=settings.cf_r2_access_key_id,
                aws_secret_access_key=settings.cf_r2_secret_access_key,
                region_name="auto"
            )
        else:
            logger.warning("Cloudflare R2 is not fully configured. File upload/delete actions will fail.")
            self.s3_client = None

    def upload_file(self, file_content: bytes, file_name: str, content_type: str) -> str:
        """Uploads a file to the Cloudflare R2 bucket and returns the public URL."""
        if not self.is_configured or not self.s3_client:
            raise HTTPException(
                status_code=503,
                detail="Cloudflare R2 service is not configured. Please check environment variables."
            )
        try:
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=file_name,
                Body=file_content,
                ContentType=content_type
            )
            public_base = self.public_url.rstrip("/")
            return f"{public_base}/{file_name}"
        except ClientError as e:
            logger.error(f"Failed to upload file to Cloudflare R2: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to upload file to Cloudflare R2: {str(e)}")

    def delete_file(self, file_url: str) -> bool:
        """Deletes a file from the Cloudflare R2 bucket based on its public URL."""
        if not self.is_configured or not self.s3_client:
            logger.warning("Cloudflare R2 is not configured; skipping file deletion.")
            return False
        try:
            parsed_url = urlparse(file_url)
            key = parsed_url.path.lstrip("/")
            self.s3_client.delete_object(Bucket=self.bucket_name, Key=key)
            return True
        except ClientError as e:
            logger.error(f"Failed to delete file {file_url} from Cloudflare R2: {e}")
            return False

cloudflare_r2_service = CloudflareR2Service()
