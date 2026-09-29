import os
<<<<<<< HEAD
=======

>>>>>>> feature/backend-medicamentos
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

<<<<<<< HEAD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
=======
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
>>>>>>> feature/backend-medicamentos

Base = declarative_base()

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
<<<<<<< HEAD
        db.close()

=======
        db.close()
>>>>>>> feature/backend-medicamentos
