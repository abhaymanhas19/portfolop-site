"""SQLAdmin package — one module per domain, aligned with ``app.models``."""

from app.admin.registry import register_admin

__all__ = ["register_admin"]
