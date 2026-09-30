from sqlalchemy import Column, Integer, String
from app.database.connection import Base

class Empleado(Base):
    __tablename__ = "empleados"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    dni = Column(Integer, nullable=False, unique=True)
    email = Column(String(150), nullable=False)
    cargo = Column(String(100), nullable=False)