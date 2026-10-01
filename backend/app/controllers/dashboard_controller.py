from sqlalchemy.orm import Session

from app.services.dashboard_service import obtener_cantidades


def obtener_dashboard(db: Session):
    return obtener_cantidades(db)