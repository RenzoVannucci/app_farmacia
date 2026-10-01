from sqlalchemy.orm import Session
from app.models.categoria import Categoria
from app.schemas.categoria import CategoriaCreate


def obtener_categorias(db: Session):
    return db.query(Categoria).all()


def obtener_categoria_por_id(db: Session, categoria_id: int):
    return db.query(Categoria).filter(
        Categoria.id == categoria_id
    ).first()


def buscar_por_nombre(db: Session, nombre: str):
    return db.query(Categoria).filter(
        Categoria.nombre.ilike(f"%{nombre}%")
    ).all()


def crear_categoria(db: Session, categoria_data: CategoriaCreate):

    categoria_existente = db.query(Categoria).filter(
    #compara si existe un duplicado e ignora masyusculas de minusculas 
    Categoria.nombre.ilike(categoria_data.nombre)  
    ).first()

    if categoria_existente:
        return None
    
    nueva_categoria = Categoria(
        nombre=categoria_data.nombre
    )

    db.add(nueva_categoria)
    db.commit()
    db.refresh(nueva_categoria)

    return nueva_categoria


def actualizar_categoria(
    db: Session,
    categoria_id: int,
    categoria_data: CategoriaCreate
):
    categoria = obtener_categoria_por_id(db, categoria_id)

    if categoria is None:
        return None

    categoria.nombre = categoria_data.nombre

    db.commit()
    db.refresh(categoria)

    return categoria


def eliminar_categoria(db: Session, categoria_id: int):
    categoria = obtener_categoria_por_id(db, categoria_id)

    if categoria is None:
        return None

    db.delete(categoria)
    db.commit()

    return categoria