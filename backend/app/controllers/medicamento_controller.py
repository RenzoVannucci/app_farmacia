from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.schemas.medicamento import MedicamentoCreate

from app.services.medicamento_service import (
    obtener_medicamentos,
    obtener_medicamento_por_id,
    buscar_por_nombre,
    crear_medicamento,
    actualizar_medicamento,
    eliminar_medicamento
)

def listar_medicamentos(db: Session):
    return obtener_medicamentos(db)


def obtener_medicamento(db: Session, medicamento_id: int):
    medicamento = obtener_medicamento_por_id(db, medicamento_id)

    if medicamento is None:
        raise HTTPException(
            status_code=404,
            detail="Medicamento no encontrado"
        )

    return medicamento


def buscar_medicamentos_por_nombre( db: Session, nombre: str
):
    medicamentos = buscar_por_nombre(db, nombre)

    if not medicamentos:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron medicamentos con ese nombre"
        )

    return medicamentos


def crear_nuevo_medicamento(
    db: Session,
    medicamento_data: MedicamentoCreate
):
    medicamento = crear_medicamento(db, medicamento_data)

    return {
        "mensaje": "Medicamento creado correctamente",
        "medicamento": medicamento
    }


def actualizar_medicamento_existente(db: Session,medicamento_id: int, medicamento_data: MedicamentoCreate
):
    medicamento = actualizar_medicamento(
        db,
        medicamento_id,
        medicamento_data
    )

    if medicamento is None:
        raise HTTPException(
            status_code=404,
            detail="Medicamento no encontrado"
        )

    return {
        "mensaje": "Medicamento actualizado correctamente",
        "medicamento": medicamento
    }


def eliminar_medicamento_existente(db: Session,medicamento_id: int
):
    medicamento = eliminar_medicamento(
        db,
        medicamento_id
    )

    if medicamento is None:
        raise HTTPException(
            status_code=404,
            detail="Medicamento no encontrado"
        )

    return {
        "mensaje": "Medicamento eliminado correctamente"
    }