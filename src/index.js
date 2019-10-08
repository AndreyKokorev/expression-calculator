function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let expression = [];
  let defrag = expr.split(' ').filter(item => item !== "");
  if (defrag.length === 1) {
    defrag = [...expr];
  }

  if ([...expr].filter(item => item == "(").length !== [...expr].filter(item => (item == ")")).length) {
    throw "ExpressionError: Brackets must be paired";
  }

  for (let i = 0; i < defrag.length; i++) {

    if (defrag.findIndex(element => element === "(") === -1) {
      return +count(defrag);
    }
    if (defrag[i] === ")") {

      for (let j = i; j >= 0; j--) {

        if (defrag[j] === "(") {
          expression = defrag.slice(j + 1, i);
          defrag.splice(j, expression.length + 2, count(expression));
          i = 0;
          break;
        }
      }
    }
    if (i === defrag.length - 1) {
      i = 0;
    }
  }

  function count(expression) {

    while (true) {
      let division = expression.findIndex(element => element === "/");
      let multiply = expression.findIndex(element => element === "*");
      let addition = expression.findIndex(element => element === "+");
      let subtraction = expression.findIndex(element => element === "-");

      if (division !== -1) {
        if (expression[division + 1] == 0) {
          throw "TypeError: Division by zero."
        }
        expression.splice(division - 1, 3, +expression[division - 1] / +expression[division + 1]);
        continue;
      }
      if (multiply !== -1) {
        expression.splice(multiply - 1, 3, +expression[multiply - 1] * +expression[multiply + 1]);
        continue;
      }

      if (subtraction !== -1) {
        expression.splice(subtraction - 1, 3, +expression[subtraction - 1] - +expression[subtraction + 1]);
        continue;
      }
      if (addition !== -1) {
        expression.splice(addition - 1, 3, +expression[addition - 1] + +expression[addition + 1]);
        continue;
      }
      break;
    }
    return expression.join("");
  }
}


module.exports = {
  expressionCalculator
}