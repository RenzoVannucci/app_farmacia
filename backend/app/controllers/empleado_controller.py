from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.schemas.empleado import EmpleadoCreate
from app.services.empleado_service import obtener_empleados, obtener_empleado_por_id, buscar_por_nombre,  buscar_por_apellido,crear_empleado, actualizar_empleado, eliminar_empleado

def listar_empleados(db:Session):
    return obtener_empleados(db)

def obtener_empleado(db:Session, empleado_id:int):
    empleado = obtener_empleado_por_id(db, empleado_id)

    if empleado is None:
        raise HTTPException (
            status_code = 404,
            detail = "Empleado no encontrado"
        )

    return empleado

def buscar_empleados_por_nombre(db: Session, nombre: str):
    empleados = buscar_por_nombre(db, nombre)
    if not empleados:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron empleados con ese nombre"
        )

    return empleados


def buscar_empleados_por_apellido(db: Session, apellido: str):
    empleados = buscar_por_apellido(db, apellido)
    if not empleados:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron empleados con ese apellido"
        )

    return empleados

def crear_nuevo_empleado(db: Session, empleado_data: EmpleadoCreate):
    empleado = crear_empleado(db, empleado_data)
    return {
        "mensaje": "Empleado creado correctamente",
        "empleado": empleado
    }


def actualizar_empleado_existente( db: Session, empleado_id: int,empleado_data: EmpleadoCreate):
    empleado = actualizar_empleado(db, empleado_id, empleado_data)
    if empleado is None:
        raise HTTPException(
            status_code=404,
            detail="Empleado no encontrado"
        )

    return {
        "mensaje": "Empleado actualizado correctamente",
        "empleado": empleado
    }


def eliminar_empleado_existente( db: Session,empleado_id: int):
    empleado = eliminar_empleado(db, empleado_id)
    if empleado is None:
        raise HTTPException(
            status_code=404,
            detail="Empleado no encontrado"
        )

    return {
        "mensaje": "Empleado eliminado correctamente"
    }