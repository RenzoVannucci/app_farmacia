from pydantic import BaseModel, EmailStr

class EmpleadoCreate(BaseModel): 
    nombre: str
    apellido: str
    dni: int
    email: EmailStr
    cargo: str