from sqlalchemy import Column, Integer, String
from app.database.connection import Base

class Categoria(Base):
    __tablename__ = "categorias"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False, unique=True)