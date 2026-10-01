from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.controllers.dashboard_controller import obtener_dashboard

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/counts")
def obtener_cantidades_dashboard(db: Session = Depends(get_db)):
    return obtener_dashboard(db)