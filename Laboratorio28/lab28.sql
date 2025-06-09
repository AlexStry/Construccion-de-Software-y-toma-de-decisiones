-- PREGUNTA 1: Qué utilidad tiene un trigger (ventajas)?
-- Los triggers permiten ejecutar acciones automáticamente cuando ocurre un cambio en una tabla.
-- Son utiles para hacer cumplir reglas de negocio y auditar registros, sin necesidad de depender del código de la aplicación.

-- PREGUNTA 2: Tipos de triggers?
-- Existen diferentes combinaciones según el momento y tipo de evento:
-- BEFORE INSERT, AFTER INSERT
-- BEFORE UPDATE, AFTER UPDATE
-- BEFORE DELETE, AFTER DELETE

-- PREGUNTA 3: En qué casos NO son útiles?
-- Cuando la logica de negocio cambia constantemente
-- Cuando afectan el rendimiento(si contienen procesos pesados).
-- Cuando se requiere un control claro desde la aplicación(debug).

-- TRIGGER 1: Validar que la entrega no sea mayor a 1000 unidades
-- Si alguien intenta insertar más de 1000 unidades, se bloquea la operación.
DELIMITER //
CREATE TRIGGER validar_entrega_maxima
BEFORE INSERT ON Entregan
FOR EACH ROW
BEGIN
    IF NEW.Cantidad > 1000 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No se pueden entregar más de 1000 unidades por registro';
    END IF;
END;
//
DELIMITER ;

-- TRIGGER 2: Auditoría automática de entregas
-- Cada vez que se hace una entrega, se registra en tabla de log.

-- Primero creamos tabla de auditoría:
CREATE TABLE IF NOT EXISTS LogEntregas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Clave VARCHAR(10),
    RFC VARCHAR(13),
    Numero INT,
    FechaEntrega DATETIME,
    Cantidad DECIMAL(10,2),
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ahora el trigger:
DELIMITER //
CREATE TRIGGER auditar_nueva_entrega
AFTER INSERT ON Entregan
FOR EACH ROW
BEGIN
    INSERT INTO LogEntregas (Clave, RFC, Numero, FechaEntrega, Cantidad)
    VALUES (NEW.Clave, NEW.RFC, NEW.Numero, NEW.Fecha, NEW.Cantidad);
END;
//
DELIMITER ;

