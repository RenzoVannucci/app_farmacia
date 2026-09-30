from pydantic import BaseModel, EmailStr, Field

class EmpleadoCreate(BaseModel): 
    nombre: str = Field(min_length = 1)
    apellido: str = Field(min_length= 1)
    dni: int
    email: EmailStr = Field(min_length=1)
    cargo: str