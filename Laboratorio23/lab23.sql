-- ¿Qué desventajas tienen los stored procedures?
-- Aunque los stored procedures ayudan a encapsular lógica y reducen el tráfico entre la aplicación y la base de datos, también pueden generar ciertas limitaciones.
-- Por ejemplo, cuando se depende demasiado de ellos, se complica el control de versiones y depuración del código. 
-- Si no se documentan bien, se vuelven difíciles de entender o mantener, y eso puede afectar la colaboración entre equipos.

-- PROCEDIMIENTO 1:
DELIMITER //
CREATE PROCEDURE RegistrarEntrega(
    IN clave VARCHAR(10),
    IN rfc VARCHAR(13),
    IN proyecto INT,
    IN fecha DATE,
    IN cantidad INT
)
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Entregan 
        WHERE Clave = clave AND RFC = rfc AND Numero = proyecto AND Fecha = fecha
    ) THEN
        INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad)
        VALUES (clave, rfc, proyecto, fecha, cantidad);
    END IF;
END;
//
DELIMITER ;

-- PROCEDIMIENTO 2:
DELIMITER //
CREATE PROCEDURE ResumenPorProyecto(
    IN id_proyecto INT
)
BEGIN
    SELECT 
        p.Denominacion,
        m.Descripcion,
        SUM(e.Cantidad) AS TotalEntregado
    FROM Entregan e
    JOIN Proyectos p ON e.Numero = p.Numero
    JOIN Materiales m ON e.Clave = m.Clave
    WHERE e.Numero = id_proyecto
    GROUP BY p.Denominacion, m.Descripcion;
END;
//
DELIMITER ;

-- PROCEDIMIENTO 3:
DELIMITER //
CREATE PROCEDURE MaterialesSinMovimiento()
BEGIN
    SELECT Clave, Descripcion
    FROM Materiales
    WHERE Clave NOT IN (
        SELECT DISTINCT Clave FROM Entregan
    );
END;
//
DELIMITER ;
