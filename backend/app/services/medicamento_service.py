from sqlalchemy.orm import Session
from app.models.medicamento import Medicamento


# CONSULTAS Y LOGICA DE LECTURA DE MEDICAMENTOS

def obtener_medicamentos(db: Session):
    return db.query(Medicamento).all()


def obtener_medicamento_por_id(db: Session, medicamento_id: int):
    return db.query(Medicamento).filter(
        Medicamento.id == medicamento_id
    ).first()


def buscar_por_nombre(db: Session, nombre: str):
    return db.query(Medicamento).filter(
        Medicamento.nombre.ilike(f"%{nombre}%")
    ).all()

from app.schemas.medicamento import MedicamentoCreate


# CREAR MEDICAMENTO

def crear_medicamento(db: Session, medicamento_data: MedicamentoCreate):
    nuevo_medicamento = Medicamento(
        nombre=medicamento_data.nombre,
        precio=medicamento_data.precio,
        stock=medicamento_data.stock,
        categoria_id=medicamento_data.categoria_id,
        fecha=medicamento_data.fecha
    )

    db.add(nuevo_medicamento)
    db.commit()
    db.refresh(nuevo_medicamento)

    return nuevo_medicamento


# ACTUALIZAR MEDICAMENTO

def actualizar_medicamento(db: Session,medicamento_id: int,medicamento_data: MedicamentoCreate):
    medicamento = obtener_medicamento_por_id(db, medicamento_id)

    if medicamento is None:
        return None

    medicamento.nombre = medicamento_data.nombre
    medicamento.precio = medicamento_data.precio
    medicamento.stock = medicamento_data.stock
    medicamento.categoria_id = medicamento_data.categoria_id
    medicamento.fecha = medicamento_data.fecha

    db.commit()
    db.refresh(medicamento)

    return medicamento


# ELIMINAR MEDICAMENTO

def eliminar_medicamento(db: Session, medicamento_id: int):
    medicamento = obtener_medicamento_por_id(db, medicamento_id)

    if medicamento is None:
        return None

    db.delete(medicamento)
    db.commit()

    return medicamento