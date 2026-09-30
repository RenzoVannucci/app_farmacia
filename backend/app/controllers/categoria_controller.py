from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.schemas.categoria import CategoriaCreate
from app.services.categoria_service import (
    obtener_categorias,
    obtener_categoria_por_id,
    buscar_por_nombre,
    crear_categoria,
    actualizar_categoria,
    eliminar_categoria
)


def listar_categorias(db: Session):
    return obtener_categorias(db)


def obtener_categoria(db: Session, categoria_id: int):
    categoria = obtener_categoria_por_id(db, categoria_id)

    if categoria is None:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return categoria

def buscar_categorias_por_nombre(db: Session, nombre: str):
    categorias = buscar_por_nombre(db, nombre)

    if not categorias:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron categorías"
        )

    return categorias

def crear_nueva_categoria( db: Session, categoria_data: CategoriaCreate):
    categoria = crear_categoria(db, categoria_data)

    if categoria is None:
        raise HTTPException(
            status_code=409,
            detail="La categoría ya existe"
        )

    return {
        "mensaje": "Categoría creada correctamente",
        "categoria": categoria
    }

def actualizar_categoria_existente(db: Session, categoria_id: int,categoria_data: CategoriaCreate):
    
    categoria = actualizar_categoria( db, categoria_id, categoria_data)

    if categoria is None:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return {
        "mensaje": "Categoría actualizada correctamente",
        "categoria": categoria
    }

def eliminar_categoria_existente(db: Session,categoria_id: int):
    categoria = eliminar_categoria(db, categoria_id)

    if categoria is None:
        raise HTTPException(
            status_code=404,
            detail="Categoría no encontrada"
        )

    return {
        "mensaje": "Categoría eliminada correctamente"
    }

