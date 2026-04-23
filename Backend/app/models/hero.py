from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class Hero(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    eyebrow: str
    title: str
    highlight: str
    description: str
    detail: str
    aiSummary: str
    trustBadge: str
    primaryActionLabel: str
    primaryActionTo: str
    secondaryActionLabel: str
    secondaryActionTo: str
    
    stats: List["HeroStat"] = Relationship(back_populates="hero")

class HeroStat(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    label: str
    value: str
    icon: Optional[str] = None
    hero_id: Optional[int] = Field(default=None, foreign_key="hero.id")
    
    hero: Optional[Hero] = Relationship(back_populates="stats")
