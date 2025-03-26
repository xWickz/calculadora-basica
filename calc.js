let num1 = "";
let num2 = "";
let operador = "";
const calculadora = document.getElementById("resultado");

/* Funciones Principales */
function calcular(n1, n2, op) {
  if(op === "" || n1 === "" || n2 === "") return;

  n1 = procesarFactorial(n1);
  n2 = procesarFactorial(n2);

  if(calculadora.value == "Entrada inválida") {
    return;
  }

  if(isNaN(n1) || isNaN(n2)) {
    calculadora.value = "Entrada inválida";
    num1 = "";
    num2 = "";
    operador = "";
    return;
  }

  const numero1 = parseFloat(n1);
  const numero2 = parseFloat(n2);

  let resultado;
  switch (op) {
    case "+":
      resultado = numero1 + numero2;
      break;
    case "-":
      resultado = numero1 - numero2;
      break;
    case "x":
      resultado = numero1 * numero2;
      break;
    case "/":
      resultado = numero1 !== 0 ? numero1 / numero2 : "Indeterminación";
      break;
    default:
      return;
  }

  return resultado;
}

function agregarNumero(numero) {
  console.log(numero);
  if (operador === "") {
    num1 += numero;
    calculadora.value = num1;
  } else {
    num2 += numero;
    calculadora.value = `${num1} ${operador} ${num2}`;
  }
}

function agregarOperacion(operacion) {
  if (num1 === "") return;

  /* Operaciones en Automático */
  if (operador !== "") {
    ejecutarCalculo();
  }

    if(!["+","-","x","/"].includes(calculadora.value.trim().slice(-1))) {
      operador = operacion;
      calculadora.value += " " + operador;
  }
}

function ejecutarCalculo() {
  const resultado = calcular(num1, num2, operador);
  if(resultado !== undefined) {
    calculadora.value = resultado;
    num1 = resultado.toString();
    num2 = "";
    operador = "";
  }
}

function limpiar() {
  num1 = "";
  num2 = "";
  operador = "";
  calculadora.value = "";
  resultado = "";
}

/* Funciones Adicionales */
function decimal() { // Función Experimental (Lo digo por los console-log).
  
  if(calculadora.value === "") { // Si la calculadora esta vacía, entonces se pone "0." en vez de "." al primer número.
    num1 = "0.";
    return;
  }

  if(resultado !== "") {
    if(!num1.includes(".") && operador === "") { 
      // Si el número 1 tiene valor, pero, no tiene ".", el operador es vacío y no hay resultado, aún.
      num1 += ".";
      return;
    } else if(num1 === "") { 
      // Si en este caso el número 1 no contiene valor se le antepone "0."
      num1 += "0.";
      return;
    }
  }

  if(!num1.includes(".") && resultado === "") {
    // Si el número 1 tiene valor pero no tiene ".". Adicional, el resultado es vacío.
    if(num1 === "") {
        // Si el número 1 no tiene valor, se le antepone un "0."
      num1 = "0.";
      return;
    }
      num1 += ".";
      return;
  } else if(!num2.includes(".") && operador !== "") {
    if(num2 === "") {
      num2 += "0.";
      return;
    }
      num2 += ".";
      return;
  }
}

function factorial() {
  if (calculadora.value === "") return;

  if (!num1.includes("!")) {
    num1 += "!";
    calculadora.value += "!";
    return;
  } else if (!num2.includes("!") && num2 !== "") {
    num2 += "!";
    calculadora.value += "!";
    return;
  }
}

/* Otros Procesos */
function procesarFactorial(numero) {

  if (numero.includes("!")) {
    const n = parseInt(numero.replace("!", ""), 10);

    if(n > 170) {
      return;
    }

    return calcularFactorial(n)
  }

  return numero;
  
}

function calcularFactorial(n) {
  n = parseInt(n, 10);
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * calcularFactorial(n - 1);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key >= "0" && event.key <= "9") {
    agregarNumero(event.key);
  } else if (["*", "-", "+", "/"].includes(event.key)) {
    agregarOperacion(event.key);
  } else if (event.key === "Enter") {
    ejecutarCalculo();
  } else if ([",", "."].includes(event.key)) {
    decimal();
  } else if (event.key === "!") {
    factorial();
  } else if (event.key === "Backspace") {
    limpiar();
  }
});
