from typing import Optional
from sqlmodel import SQLModel, Field

class AboutProfile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tag: str
    heading: str
    summary: str
    ending: str

class AboutTile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str

class ValueStatement(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
