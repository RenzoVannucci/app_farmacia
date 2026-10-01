from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.routes.medicamento_routes import router as medicamento_router

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errores = []

    for error in exc.errors():
        
        campo = error["loc"][-1]
        tipo = error["type"]

        if campo == "nombre" and tipo == "string_too_short":
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

app.include_router(medicamento_router)

@app.get("/")
def inicio():
    return {"mensaje": "API de farmacia funcionando"}