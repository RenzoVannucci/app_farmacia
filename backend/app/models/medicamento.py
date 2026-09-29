from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from app.database.connection import Base

class Medicamento(Base):
    __tablename__ = "medicamentos"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(100), nullable=False)
    precio = Column(Float, nullable= False)
    stock = Column(Integer, nullable=False)
    categoria_id = Column(Integer, ForeignKey("categorias.id"), nullable=False)
    fecha = Column(Date, nullable=False)
    