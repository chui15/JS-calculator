$(document).ready(initializeApp);

var calculationArray = [];
var displayArray = [];
var stringNumberToPush = "";
var answer = null;
var inputtedNumber = "";

function initializeApp(){
  applyClickHandlers();
}

function applyClickHandlers(){
  $('#c-button').on('click', function(){
    $('.modal').show();
    $('.close').on('click', function(){
      $('.modal').hide();
    })
  });
  $('#number-block').on('click', '.number', function numberButtonHandler(event){
    inputtedNumber = $(event.currentTarget).find('p').text();
    stringNumberToPush = stringNumberToPush.concat(inputtedNumber);
    displayArray.push(inputtedNumber);
    updateDisplay();
  });
  $('#operator-column').on('click', '.operator', function operatorButtonHandler(event){
    var inputtedOperator = "";
    inputtedOperator = $(event.currentTarget).find('p').text();
    displayArray.push(inputtedOperator);
    updateDisplay();
    if (stringNumberToPush != "") {
      calculationArray.push(stringNumberToPush);
    }
    if (isNaN(calculationArray[calculationArray.length-1])) {
        calculationArray[calculationArray.length-1] = inputtedOperator;
      }
      else {
        calculationArray.push(inputtedOperator);
      }
    stringNumberToPush = "";
  });
  $('#equals').on('click', function equalsButtonHandler(event){
    if (stringNumberToPush !== "") {
      calculationArray.push(stringNumberToPush);
    }
    stringNumberToPush = "";
    displayArray = [];
    if (calculationArray.indexOf('3.14') !== -1){
      $('.pie').show();
      $('.noface').show();
      calculationArray[calculationArray.length-1] == '';
      var answer = '';
    }
     if (isNaN(calculationArray[calculationArray.length-1])){
      calculationArray.push(calculationArray[calculationArray.length-2]);
    }
    if (!calculationArray.some(isNaN)){
      answer = calculationArray[calculationArray.length-1];
    }
    while (calculationArray.length >=3){
      answer = calculate(calculationArray[0], calculationArray[2], calculationArray[1]);
      calculationArray.splice(0,3,answer);
    }
    if (calculationArray[calculationArray.length-1] == null) {
      answer = 0;
    }
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
    $('.pie').hide();
    $('.noface').hide();
    updateDisplay();
  });
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
