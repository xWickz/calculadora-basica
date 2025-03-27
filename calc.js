const state = {
  num1: "",
  num2: "",
  operador: "",
};

const operadores = ["+","-","x","/"];
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
    state.num1 = "";
    state.num2 = "";
    state.operador = "";
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
  if (state.operador === "") {
    state.num1 += numero;
    calculadora.value = state.num1;
  } else {
    state.num2 += numero;
    calculadora.value = `${state.num1} ${state.operador} ${state.num2}`;
  }
}

function agregarOperacion(operacion) {
  if (state.num1 === "") return;

  /* Operaciones en Automático */
  if (state.operador !== "") {
    ejecutarCalculo();
  }

    if(!operadores.includes(calculadora.value.trim().slice(-1))) {
      state.operador = operacion;
      calculadora.value += " " + state.operador;
  }

}

function ejecutarCalculo() {
  const resultado = calcular(state.num1, state.num2, state.operador);
  if(resultado !== undefined) {
    calculadora.value = resultado;
    state.num1 = resultado.toString();
    state.num2 = "";
    state.operador = "";
  }
}

function limpiar() {
  state.num1 = "";
  state.num2 = "";
  state.operador = "";
  calculadora.value = "";
  resultado = "";
}

/* Funciones Adicionales */
function decimal() {
  if(state.operador === "") {
    if(!state.num1.includes(".")) {
      state.num1 += state.num1 === "" ? "0." : ".";
    }
  } else {
    if(!state.num2.includes(".")) {
      state.num2 += state.num2 === "" ? "0." : ".";
    }
  }
}

function factorial() {
  if (calculadora.value === "") return;

  if (!state.num1.includes("!")) {
    state.num1 += "!";
    calculadora.value += "!";
    return;
  } else if (!state.num2.includes("!") && state.num2 !== "") {
    state.num2 += "!";
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
  } else if (operadores.includes(event.key)) {
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
