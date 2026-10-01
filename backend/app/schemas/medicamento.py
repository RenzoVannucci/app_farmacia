from datetime import date
from pydantic import BaseModel, Field


class MedicamentoCreate(BaseModel):
    nombre: str = Field(min_length=1)
    precio: float = Field(gt=0)
    stock: int = Field(ge=0)
    categoria_id: int
    fecha: date