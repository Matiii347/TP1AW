-- Crear la base de datos
--CREATE DATABASE tp1;

-- Conectarte a la base de datos
--\c tp1;

-- Crear la tabla de autos
CREATE TABLE autos (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio INT CHECK (anio >= 1900 AND anio <= 2100),
    precio NUMERIC(12,2) CHECK (precio > 0),
    categoria VARCHAR(20) CHECK (categoria IN ('hatchback', 'utilitario', 'deportivo')),
    imagen TEXT
);

-- Insertar autos en la tabla
INSERT INTO autos (marca, modelo, anio, precio, categoria, imagen) VALUES
('Toyota', 'Yaris', 2022, 8500000.00, 'hatchback', 'https://example.com/yaris.jpg'),
('Ford', 'Fiesta', 2019, 7200000.00, 'utilitario', 'https://example.com/fiesta.jpg'),
('Chevrolet', 'Onix', 2021, 7900000.00, 'hatchback', 'https://example.com/onix.jpg'),
('Volkswagen', 'Gol Trend', 2020, 7600000.00, 'utilitario', 'https://example.com/goltrend.jpg'),
('Renault', 'Sandero RS', 2023, 9800000.00, 'deportivo', 'https://example.com/sanderors.jpg'),
('Peugeot', '208 GT', 2022, 10500000.00, 'deportivo', 'https://example.com/208gt.jpg'),
('Fiat', 'Argo', 2021, 7400000.00, 'hatchback', 'https://example.com/argo.jpg'),
('Honda', 'Fit', 2020, 8000000.00, 'utilitario', 'https://example.com/fit.jpg');