from sqlalchemy.orm import Session

from app.models.medicamento import Medicamento
from app.models.categoria import Categoria
from app.models.empleado import Empleado


def obtener_cantidades(db: Session):
    cantidad_medicamentos = db.query(Medicamento).count()
    cantidad_categorias = db.query(Categoria).count()
    cantidad_empleados = db.query(Empleado).count()

    return {
        "medicamentos": cantidad_medicamentos,
        "categorias": cantidad_categorias,
        "empleados": cantidad_empleados
    }