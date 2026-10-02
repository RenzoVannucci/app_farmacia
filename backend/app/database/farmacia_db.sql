CREATE DATABASE farmacia;
use farmacia;


INSERT INTO categorias(nombre) VALUES
('Analgésicos'),
('Antibióticos'),
('Antiinflamatorios'),
('Vitaminas'),
('Antialérgicos');

INSERT INTO medicamentos (nombre, precio, stock, categoria_id, fecha) VALUES
('Paracetamol 500mg', 2500.00, 50, 6, '2026-09-01'),
('Ibuprofeno 400mg', 3200.00, 35, 8, '2026-09-02'),
('Amoxicilina 500mg', 5800.00, 20, 7, '2026-09-03'),
('Vitamina C 1g', 4100.00, 45, 9, '2026-09-04'),
('Loratadina 10mg', 2900.00, 30, 10, '2026-09-05'),
('Aspirina 500mg', 2700.00, 40, 6, '2026-09-06'),
('Azitromicina 500mg', 7200.00, 15, 7, '2026-09-07'),
('Diclofenac 50mg', 3600.00, 25, 8, '2026-09-08'),
('Multivitamínico', 6500.00, 18, 9, '2026-09-09'),
('Cetirizina 10mg', 3100.00, 22, 10, '2026-09-10');


INSERT INTO empleados (nombre, apellido, dni, email, cargo) VALUES
('Laura', 'Gómez', 30123456, 'laura.gomez@farmacia.com', 'Farmacéutica'),
('Martín', 'Pérez', 32456789, 'martin.perez@farmacia.com', 'Auxiliar de farmacia'),
('Sofía', 'Rodríguez', 35678901, 'sofia.rodriguez@farmacia.com', 'Farmacéutica'),
('Diego', 'Fernández', 28765432, 'diego.fernandez@farmacia.com', 'Administrativo'),
('Camila', 'Martínez', 39123456, 'camila.martinez@farmacia.com', 'Auxiliar de farmacia'

SELECT
    m.nombre AS medicamento,
    c.nombre AS categoria,
    m.precio,
    m.stock,
    m.fecha
FROM medicamentos m
JOIN categorias c ON m.categoria_id = c.id;

