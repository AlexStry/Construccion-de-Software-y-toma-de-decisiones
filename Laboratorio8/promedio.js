function calcularPromedio(arr) {
    if (arr.length === 0) return 0;
    const suma = arr.reduce((acc, val) => acc + val, 0);
    return suma / arr.length;
  }
  
  const numeros = [5, 10, 15, 20, 25];
  console.log("Promedio:", calcularPromedio(numeros));
