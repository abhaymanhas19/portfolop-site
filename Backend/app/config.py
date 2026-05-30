"""Application configuration settings loaded from environment variables using Pydantic Settings."""
from typing import Optional
import urllib.parse
from pydantic import Field, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Database configurations
    db_user: str = Field(default="postgres", alias="DB_USER")
    db_password: str = Field(default="postgres", alias="DB_PASSWORD")
    db_host: str = Field(default="localhost", alias="DB_HOST")
    db_port: int = Field(default=5432, alias="DB_PORT")
    db_name: str = Field(default="postgres", alias="DB_NAME")
    database_url: Optional[str] = Field(default=None, alias="DATABASE_URL")

    # Cloudflare R2 configurations
    cf_r2_access_key_id: Optional[str] = Field(default=None, alias="CF_R2_ACCESS_KEY_ID")
    cf_r2_secret_access_key: Optional[str] = Field(default=None, alias="CF_R2_SECRET_ACCESS_KEY")
    cf_r2_endpoint_url: Optional[str] = Field(default=None, alias="CF_R2_ENDPOINT_URL")
    cf_r2_bucket_name: Optional[str] = Field(default=None, alias="CF_R2_BUCKET_NAME")
    cf_r2_public_url: Optional[str] = Field(default=None, alias="CF_R2_PUBLIC_URL")

    # Cloudflare Stream configurations
    cf_stream_account_id: Optional[str] = Field(default=None, alias="CF_STREAM_ACCOUNT_ID")
    cf_stream_api_token: Optional[str] = Field(default=None, alias="CF_STREAM_API_TOKEN")

    # Mail configurations
    mail_username: Optional[str] = Field(default=None, alias="MAIL_USERNAME")
    mail_password: Optional[str] = Field(default=None, alias="MAIL_PASSWORD")
    mail_from: Optional[str] = Field(default=None, alias="MAIL_FROM")
    mail_port: int = Field(default=587, alias="MAIL_PORT")
    mail_server: str = Field(default="smtp.office365.com", alias="MAIL_SERVER")

    # Security configurations
    session_secret: str = Field(default="super-secret-session-key", alias="SESSION_SECRET")
    admin_user: str = Field(default="admin@example.com", alias="ADMIN_USER")
    admin_password: str = Field(default="admin", alias="ADMIN_PASSWORD")

    # Server configurations
    port: int = Field(default=8000, alias="PORT")
    host: str = Field(default="0.0.0.0", alias="HOST")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @computed_field
    @property
    def sync_database_url(self) -> str:
        """Returns synchronous PostgreSQL URL."""
        if self.database_url:
            return self.database_url
        encoded_password = urllib.parse.quote_plus(self.db_password)
        return f"postgresql://{self.db_user}:{encoded_password}@{self.db_host}:{self.db_port}/{self.db_name}"

    @computed_field
    @property
    def async_database_url(self) -> str:
        """Returns asynchronous PostgreSQL URL using asyncpg."""
        return self.sync_database_url.replace("postgresql://", "postgresql+asyncpg://")

settings = Settings()
