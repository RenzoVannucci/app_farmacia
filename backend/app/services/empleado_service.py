from sqlalchemy.orm import Session
from app.models.empleado import Empleado
from app.schemas.empleado import EmpleadoCreate

#CONSULTAS Y LOGICA DE LECTURA DE EMPLEADOS

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


#CREAR EMPLEADOS 
def crear_empleado(db: Session, empleado_data: EmpleadoCreate):
    nuevo_empleado = Empleado(
        nombre=empleado_data.nombre,
        apellido=empleado_data.apellido,
        dni=empleado_data.dni,
        email=empleado_data.email,
        cargo=empleado_data.cargo
    )


    db.add(nuevo_empleado)
    db.commit()
    db.refresh(nuevo_empleado)

    return nuevo_empleado