from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.controllers.empleado_controller import listar_empleados, obtener_empleado, buscar_empleados_por_nombre, buscar_empleados_por_apellido, crear_nuevo_empleado, actualizar_empleado_existente, eliminar_empleado_existente
from app.schemas.empleado import EmpleadoCreate


router = APIRouter(
    prefix="/empleados",
    tags=["Empleados"]
)

@router.get("/")
def listar(db:Session = Depends(get_db)):
    return listar_empleados(db)

@router.get("/buscar/nombre")
def buscar_nombre( nombre: str,db: Session = Depends(get_db)):
    return buscar_empleados_por_nombre(db, nombre)

@router.get("/buscar/apellido")
def buscar_apellido(apellido: str, db: Session = Depends(get_db)
):
    return buscar_empleados_por_apellido(db, apellido)

@router.get("/{empleado_id}")
def obtener( empleado_id: int, db: Session = Depends(get_db)):
    return obtener_empleado(db, empleado_id)

@router.post("/")
def crear(empleado_data: EmpleadoCreate, db: Session = Depends(get_db)):
    return crear_nuevo_empleado(db, empleado_data)

@router.put("/{empleado_id}")
def actualizar(empleado_id: int,empleado_data: EmpleadoCreate,db: Session = Depends(get_db)):
    return actualizar_empleado_existente(db, empleado_id,empleado_data)

@router.delete("/{empleado_id}")
def eliminar(empleado_id: int,db: Session = Depends(get_db)
):
    return eliminar_empleado_existente(db, empleado_id)