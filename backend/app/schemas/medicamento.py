from datetime import date
from pydantic import BaseModel, Field


class MedicamentoCreate(BaseModel):
    nombre: str = Field(min_length=1)
    precio: float
    stock: int
    categoria_id: int
    fecha: date