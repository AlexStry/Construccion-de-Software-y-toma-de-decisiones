-- Total de unidades y monto facturado de entregas durante el año 1997
SELECT 
  SUM(e.Cantidad) AS UnidadesTotales,
  SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto)) AS ValorTotal
FROM Entregan e
INNER JOIN Materiales m ON m.Clave = e.Clave
WHERE EXTRACT(YEAR FROM e.Fecha) = 1997;

-- Número de entregas y monto global por proveedor
SELECT 
  p.RazonSocial AS Proveedor,
  COUNT(*) AS TotalEntregas,
  SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto)) AS MontoGlobal
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
JOIN Materiales m ON m.Clave = e.Clave
GROUP BY p.RazonSocial;

-- Estadísticas por material donde el promedio entregado supere las 400 unidades
SELECT 
  m.Clave,
  m.Descripcion AS NombreMaterial,
  SUM(e.Cantidad) AS Acumulado,
  MAX(e.Cantidad) AS EntregaMax,
  MIN(e.Cantidad) AS EntregaMin,
  SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto)) AS TotalFacturado
FROM Materiales m
JOIN Entregan e ON m.Clave = e.Clave
GROUP BY m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) > 400;

-- Proveedores que entregaron materiales con un promedio igual o superior a 500 unidades
SELECT 
  p.RazonSocial AS Empresa,
  m.Clave AS Codigo,
  m.Descripcion AS Producto,
  ROUND(AVG(e.Cantidad), 2) AS PromedioUnidades
FROM Proveedores p
JOIN Entregan e ON e.RFC = p.RFC
JOIN Materiales m ON m.Clave = e.Clave
GROUP BY p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) >= 500;

-- Clasificación de promedios de entrega por proveedor en dos rangos extremos
SELECT 
  p.RazonSocial,
  m.Descripcion,
  ROUND(AVG(e.Cantidad), 1) AS CantidadPromedio,
  CASE 
    WHEN AVG(e.Cantidad) < 370 THEN 'Rango Bajo'
    WHEN AVG(e.Cantidad) > 450 THEN 'Rango Alto'
    ELSE '---'
  END AS Grupo
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY p.RazonSocial, m.Descripcion
HAVING AVG(e.Cantidad) < 370 OR AVG(e.Cantidad) > 450;

-- Alta de 5 materiales nuevos en el catálogo
INSERT INTO Materiales VALUES 
('M100', 'Panel Aislante', 185.00, 0.13),
('M101', 'Lamina Galvanizada', 220.00, 0.11),
('M102', 'Pintura Vinílica', 95.00, 0.09),
('M103', 'Clavo de Acero', 30.00, 0.07),
('M104', 'Silicón Sellador', 70.00, 0.10);

-- Materiales que no han sido incluidos en ninguna entrega registrada
SELECT m.Clave, m.Descripcion
FROM Materiales m
WHERE NOT EXISTS (
  SELECT 1 FROM Entregan e WHERE e.Clave = m.Clave
);

-- Empresas proveedoras que entregaron tanto a 'Vamos México' como a 'Querétaro Limpio'
SELECT p.RazonSocial
FROM Proveedores p
WHERE EXISTS (
  SELECT 1 FROM Entregan e 
  JOIN Proyectos pr ON e.Numero = pr.Numero 
  WHERE pr.Denominacion = 'Vamos México' AND e.RFC = p.RFC
)
AND EXISTS (
  SELECT 1 FROM Entregan e 
  JOIN Proyectos pr ON e.Numero = pr.Numero 
  WHERE pr.Denominacion = 'Querétaro Limpio' AND e.RFC = p.RFC
);

-- Materiales que jamás se han utilizado en el proyecto 'CIT Yucatán'
SELECT m.Descripcion
FROM Materiales m
WHERE m.Clave NOT IN (
  SELECT e.Clave
  FROM Entregan e
  JOIN Proyectos pr ON e.Numero = pr.Numero
  WHERE pr.Denominacion = 'CIT Yucatán'
);

-- Proveedores cuyo promedio de entrega es superior al del proveedor con RFC VAGO780901
SELECT 
  p.RazonSocial, 
  ROUND(AVG(e.Cantidad), 2) AS PromedioProveedor
FROM Entregan e
JOIN Proveedores p ON e.RFC = p.RFC
GROUP BY p.RazonSocial
HAVING AVG(e.Cantidad) > (
  SELECT AVG(Cantidad)
  FROM Entregan
  WHERE RFC = 'VAGO780901'
);

-- Empresas que entregaron más en el año 2000 que en 2001 al proyecto 'Infonavit Durango'
SELECT DISTINCT p.RFC, p.RazonSocial
FROM Proveedores p
JOIN Entregan e ON p.RFC = e.RFC
WHERE e.Numero = (
  SELECT Numero FROM Proyectos WHERE Denominacion = 'Infonavit Durango'
)
GROUP BY p.RFC, p.RazonSocial
HAVING 
  SUM(CASE WHEN EXTRACT(YEAR FROM e.Fecha) = 2000 THEN e.Cantidad ELSE 0 END) >
  SUM(CASE WHEN EXTRACT(YEAR FROM e.Fecha) = 2001 THEN e.Cantidad ELSE 0 END);
