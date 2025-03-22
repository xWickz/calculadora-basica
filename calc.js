let num1 = "";
let num2 = "";
let operador = "";
let resultado = "";
let memoria = "";
const calculadora = document.getElementById("resultado");
const botones = [
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["C", "0", ",", "="],
  ["!"],
];

function crearBotones() {
  const container = document.getElementById("botones");
  botones.forEach((fila) => {
    const div = document.createElement("div");
    fila.forEach((boton) => {
      const button = document.createElement("button");
      button.textContent = boton;
      button.onclick = () => {
        if (boton === "C") {
          limpiar();
        } else if (boton === "=") {
          calcular();
        } else if (boton === "!") {
          factorial();
        } else if (boton === ",") {
          decimal();
        } else {
          if (["x", "-", "+", "/"].includes(boton)) {
            setop(boton);
          } else {
            agregarn(boton);
          }
        }
      };
      div.appendChild(button);
    });
    container.appendChild(div);
  });
}

crearBotones();

function agregarn(numero) {
  if (operador === "") {
    num1 += numero;
    calculadora.value = num1;
  } else {
    num2 += numero;
    calculadora.value = num1 + " " + operador + " " + num2;
  }
}

function setop(operacion) {
  if (num1 === "") return;

  operador = operacion;
  calculadora.value += " " + operador;
}

function calcular() {
  if (operador === "" || num1 === "" || num2 === "") return;

  num1 = procesarFactorial(num1);
  num2 = procesarFactorial(num2);

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (operador) {
    case "+":
      resultado = n1 + n2;
      break;
    case "-":
      resultado = n1 - n2;
      break;
    case "x":
      resultado = n1 * n2;
      break;
    case "/":
      resultado = n2 !== 0 ? n1 / n2 : "indeterminado";
      break;
    default:
      return;
  }

  calculadora.value = resultado;
  num1 = resultado.toString();
  num2 = "";
  operador = "";

  console.log(resultado);
}

function decimal() {
  if (calculadora.value === "") return;

  if (resultado !== "") {
    if (!num2.includes(".")) {
      num2 += ".";
      return;
    }
  }

  if (!num1.includes(".") && resultado === "") {
    num1 += ".";
    return;
  } else if (!num2.includes(".")) {
    if (num2 === "") return;
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

function procesarFactorial(numero) {
  if (numero.includes("!")) {
    const n = parseInt(numero.replace("!", ""), 10);
    return calcularFactorial(numero);
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

function limpiar() {
  num1 = "";
  num2 = "";
  operador = "";
  calculadora.value = "";
  resultado = "";
}

document.addEventListener("keypress", function (event) {
  if (event.key >= "0" && event.key <= "9") {
    agregarn(event.key);
  } else if (["*", "-", "+", "/"].includes(event.key)) {
    setop(event.key);
  } else if (event.key === "Enter") {
    calcular();
  } else if ([",", "."].includes(event.key)) {
    decimal();
  } else if (event.key === "!") {
    factorial();
  }
});
