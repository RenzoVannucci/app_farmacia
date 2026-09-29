from fastapi import FastAPI
<<<<<<< HEAD
from app.routes.empleado_routes import router as empleado_router
=======
>>>>>>> feature/backend-medicamentos
from app.routes.medicamento_routes import router as medicamento_router

app = FastAPI()

<<<<<<< HEAD
app.include_router(empleado_router)
app.include_router(medicamento_router)


=======
app.include_router(medicamento_router)

>>>>>>> feature/backend-medicamentos
@app.get("/")
def inicio():
    return {"mensaje": "API de farmacia funcionando"}