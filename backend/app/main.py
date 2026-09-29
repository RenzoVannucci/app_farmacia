from fastapi import FastAPI
from app.routes.empleado_routes import router as empleado_router
from app.routes.medicamento_routes import router as medicamento_router

app = FastAPI()

app.include_router(empleado_router)
app.include_router(medicamento_router)


@app.get("/")
def inicio():
    return {"mensaje": "API de farmacia funcionando"}