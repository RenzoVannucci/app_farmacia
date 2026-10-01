from fastapi import FastAPI
from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.routes.empleado_routes import router as empleado_router

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errores = []

    for error in exc.errors():
        campo = error["loc"][-1]
        tipo = error["type"]

        if campo == "nombre" and tipo == "string_too_short":
            mensaje = "El nombre es obligatorio"
        elif campo == "apellido" and tipo == "string_too_short":
            mensaje = "El apellido es obligatorio"
        elif campo == "dni" and tipo == "missing":
            mensaje = "El DNI es obligatorio"
        elif campo == "email" and tipo == "value_error":
            mensaje = "El email no es válido"
        elif campo == "cargo" and tipo == "string_too_short":
            mensaje = "El cargo es obligatorio"
        else:
            mensaje = "El dato ingresado no es válido"

        errores.append(mensaje)

    return JSONResponse(
        status_code=422,
        content={"detail": errores}
    )

app.include_router(empleado_router)


@app.get("/")
def inicio():
    return {"mensaje": "API de farmacia funcionando"}