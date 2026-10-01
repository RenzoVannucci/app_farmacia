from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.routes.empleado_routes import router as empleado_router
from app.routes.medicamento_routes import router as medicamento_router
from app.routes.categoria_routes import router as categoria_router

# Rutas para conectar a MySQL real
from app.database.connection import Base, engine

from app.models.empleado import Empleado
from app.models.medicamento import Medicamento
from app.models.categoria import Categoria


app = FastAPI()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errores = []

    for error in exc.errors():
        campo = error["loc"][-1]
        tipo = error["type"]

        if campo == "nombre" and tipo == "string_too_short":
            if request.url.path.startswith("/categorias"):
                mensaje = "El nombre de la categoría es obligatorio"
            else:
                mensaje = "El nombre es obligatorio"

        elif campo == "precio" and tipo == "greater_than":
            mensaje = "El precio debe ser mayor a 0"

        elif campo == "stock" and tipo == "greater_than_equal":
            mensaje = "El stock no puede ser negativo"

        elif campo == "categoria_id" and tipo == "missing":
            mensaje = "La categoría es obligatoria"

        elif campo == "fecha" and tipo == "date_from_datetime_parsing":
            mensaje = "La fecha no es válida"

        else:
            mensaje = "El dato ingresado no es válido"

        errores.append(mensaje)

    return JSONResponse(
        status_code=422,
        content={"detail": errores}
    )


Base.metadata.create_all(bind=engine)

app.include_router(empleado_router)
app.include_router(medicamento_router)
app.include_router(categoria_router)


@app.get("/")
def inicio():
    return {"mensaje": "API de farmacia funcionando"}