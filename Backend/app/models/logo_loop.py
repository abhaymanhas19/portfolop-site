from typing import Optional
from sqlmodel import SQLModel, Field

class LogoLoopItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    label: str
    acronym: str
    background: str
    foreground: str
    accent: str
    url: str
