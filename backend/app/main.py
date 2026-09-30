from fastapi import FastAPI

from app.routes.empleado_routes import router as empleado_router
from app.routes.medicamento_routes import router as medicamento_router
from app.routes.categoria_routes import router as categoria_router

#rutas para conectar a mysql real
from app.database.connection import Base, engine

from app.models.empleado import Empleado
from app.models.medicamento import Medicamento
from app.models.categoria import Categoria


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(empleado_router)
app.include_router(medicamento_router)
app.include_router(categoria_router)


@app.get("/")
def inicio():
    return {"mensaje": "API de farmacia funcionando"}