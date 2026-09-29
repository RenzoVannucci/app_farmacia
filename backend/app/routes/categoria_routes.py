from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.categoria import CategoriaCreate
from app.controllers.categoria_controller import (
    listar_categorias,
    obtener_categoria,
    buscar_categorias_por_nombre,
    crear_nueva_categoria,
    actualizar_categoria_existente,
    eliminar_categoria_existente
)


router = APIRouter(
    prefix="/categorias",
    tags=["Categorías"]
)

@router.get("/")
def obtener_categorias_routes(db: Session = Depends(get_db)):
    return listar_categorias(db)

@router.get("/{categoria_id}")
def obtener_categoria_por_id_routes(categoria_id: int, db: Session = Depends(get_db)):

    return obtener_categoria(db, categoria_id)

@router.get("/buscar/")
def buscar_categorias_por_nombre_routes(nombre: str,db: Session = Depends(get_db)):

    return buscar_categorias_por_nombre(db, nombre)

@router.post("/")
def crear_categoria_routes(categoria_data: CategoriaCreate,db: Session = Depends(get_db)):

    return crear_nueva_categoria(db, categoria_data)

@router.put("/{categoria_id}")
def actualizar_categoria_routes(categoria_id: int,categoria_data: CategoriaCreate,db: Session = Depends(get_db)):

    return actualizar_categoria_existente(db, categoria_id, categoria_data)

@router.delete("/{categoria_id}")
def eliminar_categoria_routes(categoria_id: int, db: Session = Depends(get_db)):
    
    return eliminar_categoria_existente(db, categoria_id)