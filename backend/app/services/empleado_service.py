from sqlalchemy.orm import Session
from app.models.empleado import Empleado

def obtener_empleados(db:Session):
    return db.query(Empleado).all()

def obtener_empleado_por_id(db:Session, empleado_id: int):
    return db.query(Empleado).filter(
        Empleado.id == empleado_id
    ).first()

def buscar_por_nombre(db:Session, nombre:str):
    return db.query(Empleado).filter(
        Empleado.nombre.apellido.ilike(f"%{nombre}%")
    ).all()


def buscar_por_apellido(db: Session, apellido: str):
    return db.query(Empleado).filter(
        Empleado.apellido.ilike(f"%{apellido}%")
    ).all()