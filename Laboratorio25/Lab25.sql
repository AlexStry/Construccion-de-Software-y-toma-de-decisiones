-- Objetivo: Aplicar control de transacciones (COMMIT y ROLLBACK) en inserciones sobre la tabla `entregan`.
-- ¿Qué es una transacción?
-- Es una unidad lógica de trabajo que puede incluir varias instrucciones SQL.
-- Cumple con las propiedades ACID: Atomicidad, Coherencia, Aislamiento y Durabilidad.
-- Las transacciones permiten mantener la integridad de los datos en operaciones complejas.

-- Transacción 1: Inserciones exitosas

START TRANSACTION;
INSERT INTO entregan (Clave, RFC, Numero, Fecha, Cantidad)
VALUES (1300, 'GGGG800101', 5019, '2025-06-10 00:00:00', 400);
INSERT INTO entregan (Clave, RFC, Numero, Fecha, Cantidad)
VALUES (1300, 'GGGG800101', 5001, '2025-06-10 00:00:00', 150);

COMMIT;

-- Resultado esperado: Ambas entregas insertadas exitosamente.

-- Transacción 2: Error por restricción de integridad

START TRANSACTION;
INSERT INTO entregan (Clave, RFC, Numero, Fecha, Cantidad)
VALUES (1300, 'NOEXISTE999', 5001, '2025-06-11 00:00:00', 250);

COMMIT;

-- Resultado esperado: Error por FK (el RFC 'NOEXISTE999' no existe en `proveedores`), no se inserta nada.

-- Transacción 3: ROLLBACK manual

START TRANSACTION;
INSERT INTO entregan (Clave, RFC, Numero, Fecha, Cantidad)
VALUES (1300, 'GGGG800101', 5002, '2025-06-12 00:00:00', 300);

ROLLBACK;

-- Resultado esperado: La entrega no se guarda, ya que la transacción fue revertida manualmente.

