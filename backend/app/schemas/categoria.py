from pydantic import BaseModel, Field

class CategoriaCreate(BaseModel):
    nombre: str = Field(min_length=1)