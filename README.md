# Sistema de Gestión para Farmacia

## 1. Nombre del proyecto

**Sistema de Gestión para Farmacia**

---

## 2. Integrantes

* **Renzo Vannucci**
* **Bruno Martinez**

---

## 3. Descripción

El proyecto consiste en una aplicación web para la gestión de información de una farmacia.

El sistema permite administrar medicamentos, categorías y empleados mediante operaciones de alta, consulta, modificación y eliminación (CRUD).

La aplicación cuenta con un backend desarrollado con FastAPI y una interfaz web desarrollada con React y Material UI.

---

## 4. Tecnologías utilizadas

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* PyMySQL
* Uvicorn

### Base de datos

* MySQL 8.0
* Docker

### Frontend

* React
* Vite
* Material UI
* JavaScript
* HTML
* CSS

### Herramientas

* Visual Studio Code
* Git
* GitHub
* DBeaver
* Docker Desktop

---

## 5. Requisitos

Para ejecutar el proyecto se necesita tener instalado:

* Python 3
* Node.js
* npm
* Docker Desktop
* Git
* DBeaver

---

## 6. Instalación de dependencias

### Backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Crear un entorno virtual:

```bash
python -m venv .venv
```

Activar el entorno virtual en Windows:

```bash
.venv\Scripts\activate
```

Instalar las dependencias:

```bash
pip install -r requirements.txt
```

### Frontend

Ingresar a la carpeta del frontend:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

---

## 7. Configuración de MySQL

El proyecto utiliza una base de datos MySQL llamada:

```text
farmacia
```

La base de datos se ejecuta mediante Docker.

Configuración utilizada:

```text
Host: localhost
Puerto: 3306
Usuario: root
Contraseña: root
Base de datos: farmacia
```

El archivo `backend/app/database/farmacia_db.sql` contiene la estructura de la base de datos y los datos iniciales necesarios para realizar la configuración.

Los datos iniciales incluyen:

* 5 categorías
* 5 empleados
* 10 medicamentos

---

## 8. Configuración del backend

El backend utiliza una variable de entorno para establecer la conexión con MySQL.

Crear un archivo `.env` dentro de la carpeta `backend`:

```text
DATABASE_URL=mysql+pymysql://root:root@localhost:3306/farmacia
```

El backend está desarrollado utilizando FastAPI y se ejecuta mediante Uvicorn.

---

## 9. Configuración del frontend

El frontend está desarrollado con React y Vite.

Desde la carpeta `frontend`, instalar las dependencias mediante:

```bash
npm install
```

El frontend se comunica con el backend mediante solicitudes HTTP a la API desarrollada con FastAPI.

---

## 10. Cómo ejecutar el proyecto

### 1. Iniciar MySQL

Iniciar Docker Desktop y ejecutar el contenedor de MySQL.

### 2. Ejecutar el backend

Desde la carpeta `backend`:

```bash
.venv\Scripts\activate
```

Luego:

```bash
uvicorn app.main:app --reload
```

El backend estará disponible en:

```text
http://127.0.0.1:8000
```

La documentación de la API estará disponible en:

```text
http://127.0.0.1:8000/docs
```

### 3. Ejecutar el frontend

Abrir otra terminal e ingresar a la carpeta `frontend`:

```bash
npm run dev
```

El frontend estará disponible en la dirección indicada por Vite, normalmente:

```text
http://localhost:5173
```

---

## 11. Estructura del proyecto

```text
app_farmacia/
│
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── categoria_controller.py
│   │   │   ├── empleado_controller.py
│   │   │   └── medicamento_controller.py
│   │   │
│   │   ├── database/
│   │   │   ├── connection.py
│   │   │   └── farmacia_db.sql
│   │   │
│   │   ├── models/
│   │   │   ├── categoria.py
│   │   │   ├── empleado.py
│   │   │   └── medicamento.py
│   │   │
│   │   ├── routes/
│   │   │   ├── categoria_routes.py
│   │   │   ├── empleado_routes.py
│   │   │   └── medicamento_routes.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── categoria.py
│   │   │   ├── empleado.py
│   │   │   └── medicamento.py
│   │   │
│   │   ├── services/
│   │   │   ├── categoria_service.py
│   │   │   ├── empleado_service.py
│   │   │   └── medicamento_service.py
│   │   │
│   │   ├── config.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
```

---

## 12. Capturas de pantalla

Las capturas de pantalla del proyecto se incluyen en una carpeta dentro del repositorio.

---

## 13. Integrantes y distribución general de tareas

### Renzo Vannucci

* Desarrollo del backend.
* Diseño y configuración de la base de datos.
* Desarrollo de modelos y esquemas.
* Implementación de rutas, controladores y servicios.
* Implementación de operaciones CRUD.
* Integración del backend con MySQL.
* Configuración general del proyecto.

### Bruno Martinez

* Desarrollo del frontend.
* Diseño de la interfaz de usuario.
* Implementación de las diferentes pantallas.
* Desarrollo de tablas y componentes.
* Navegación entre las diferentes secciones.
* Integración del frontend con el backend.

### Trabajo conjunto

* Integración del frontend y backend.
* Pruebas de funcionamiento.
* Corrección de errores.
* Organización y documentación del proyecto.
