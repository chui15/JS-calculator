$(document).ready(initializeApp);

var calculationArray = [];
var displayArray = [];
var stringNumberToPush = "";
var answer = null;
var inputtedNumber = "";
// var displayText = null;

function initializeApp(){
  applyClickHandlers();
}

function applyClickHandlers(){
  $('#number-block').on('click', '.number', function numberButtonHandler(event){
    // console.log(event);
    inputtedNumber = $(event.currentTarget).find('p').text();
    stringNumberToPush = stringNumberToPush.concat(inputtedNumber);
    displayArray.push(inputtedNumber);
    console.log(displayArray);
    updateDisplay();
  });
  $('#operator-column').on('click', '.operator', function operatorButtonHandler(event){
    // console.log(event);
    var inputtedOperator = "";
    inputtedOperator = $(event.currentTarget).find('p').text();
    displayArray.push(inputtedOperator);
    updateDisplay();
    if (stringNumberToPush != "") {
      calculationArray.push(stringNumberToPush);
    }
    //given input in calculator [2, +, -, *, 2]
    //we are checking if the last-inputted operator is an operator (so not a number)
    //this will work with any sequence of operators because it will always just replace w/ the last inputted operator
    //if not, assigns it to the last-inputted operator and then does the calculation
    if (isNaN(calculationArray[calculationArray.length-1])) {
        calculationArray[calculationArray.length-1] = inputtedOperator;
      }
      else {
        calculationArray.push(inputtedOperator);
      }
    console.log(calculationArray);
    stringNumberToPush = "";
  });
  $('#equals').on('click', function equalsButtonHandler(event){
    calculationArray.push(stringNumberToPush);
    stringNumberToPush = "";
    displayArray = [];
    answer = calculate(calculationArray[0], calculationArray[2], calculationArray[1]);
    console.log(answer);
    displayArray.push(answer);
    updateDisplay();
  });
  $('#decimal').on('click', function decimalsButtonHandler(event){
    var inputtedDecimal = "";
    inputtedDecimal = $(event.currentTarget).find('p').text();
    stringNumberToPush = stringNumberToPush.concat(inputtedDecimal);
    displayArray.push(inputtedDecimal);
    updateDisplay();
    if (stringNumberToPush.includes('..')){
      stringNumberToPush = stringNumberToPush.substring(0, stringNumberToPush.length-1);
    }
  });
  $('#ac-button').on('click', function clearCalculator(event){
    stringNumberToPush = "";
    calculationArray = [];
    inputtedNumber = "";
    answer = null;
    displayArray = [];
    updateDisplay();
  });
  // $('#c-button').on('click', function clearOnce(event){
    //remove from end of string every time it is clicked
  //   stringNumberToPush = $(stringNumberToPush).slice(0,-1);
  //   displayArray.push(stringNumberToPush);
  //   updateDisplay();
  // });
}

function updateDisplay (){
  var displayText = displayArray.join("");
  $('#display-text').text(displayText);
}

function calculate (num1, num2, operator){
  var number1 = parseFloat(num1);
  var number2 = parseFloat(num2);
  var result = null;
  switch (operator) {
    case "+":
      result = number1 + number2;
      break;
    case "-":
      result = number1 - number2;
      break;
    case "*":
      result = number1 * number2;
      break;
    case "/":
      result = number1/number2;
  }
  switch (number2) {
    case 0:
      result = "Ewwor (ಥ﹏ಥ)";
  }
  return result;
}
