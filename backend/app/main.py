from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.routes.categoria_routes import router as categoria_router

app = FastAPI()

app.include_router(categoria_router)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errores = []

    for error in exc.errors():
        campo = error["loc"][-1]
        tipo = error["type"]

        if campo == "nombre" and tipo == "string_too_short":
            mensaje = "El nombre de la categoría es obligatorio"
        else:
            mensaje = "El dato ingresado no es válido"

        errores.append(mensaje)

    return JSONResponse(
        status_code=422,
        content={"detail": errores}
    )


@app.get("/")
def inicio():
    return {"mensaje": "API de farmacia funcionando"}