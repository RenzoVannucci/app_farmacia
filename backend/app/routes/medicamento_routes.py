from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.medicamento import MedicamentoCreate

from app.controllers.medicamento_controller import (
    listar_medicamentos,
    obtener_medicamento,
    buscar_medicamentos_por_nombre,
    crear_nuevo_medicamento,
    actualizar_medicamento_existente,
    eliminar_medicamento_existente
)


router = APIRouter(
    prefix="/medicamentos",
    tags=["Medicamentos"]
)

@router.get("/")
def listar_medicamentos_route(db: Session = Depends(get_db)):
    return listar_medicamentos(db)


@router.get("/buscar/nombre")
def buscar_nombre_por_medicamento_route(
    nombre: str,
    db: Session = Depends(get_db)
):
    return buscar_medicamentos_por_nombre(db, nombre)


@router.get("/{medicamento_id}")
def obtener_medicamento_por_id_route(
    medicamento_id: int,
    db: Session = Depends(get_db)
):
    return obtener_medicamento(db, medicamento_id)


@router.post("/")
def crear_medicamento_route(
    medicamento_data: MedicamentoCreate,
    db: Session = Depends(get_db)
):
    return crear_nuevo_medicamento(db, medicamento_data)


@router.put("/{medicamento_id}")
def actualizar_medicamento_route(
    medicamento_id: int,
    medicamento_data: MedicamentoCreate,
    db: Session = Depends(get_db)
):
    return actualizar_medicamento_existente(db,medicamento_id,medicamento_data)


@router.delete("/{medicamento_id}")
def eliminar_medicamento_route(medicamento_id: int, db: Session = Depends(get_db)):
    return eliminar_medicamento_existente( db,medicamento_id)