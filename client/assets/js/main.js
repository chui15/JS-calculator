$(document).ready(initializeApp);

var calculationArray = [];
var displayArray = [];
var stringNumberToPush = "";
var calculationResult = null;
var inputtedNumber = "";

function initializeApp(){
  applyClickHandlers();
}

function applyClickHandlers(){
  $('#number-block').on('click', '.number', function numberButtonHandler(event){
    console.log(event);
    inputtedNumber = $(event.currentTarget).find('p').text();
    stringNumberToPush = stringNumberToPush.concat(inputtedNumber);
    displayArray.push(inputtedNumber);
    console.log(displayArray);
    updateDisplay();
  });
  $('#operator-column').on('click', '.operator', function operatorButtonHandler(event){
    console.log(event);
    var inputtedOperator = "";
    inputtedOperator = $(event.currentTarget).find('p').text();
    displayArray.push(inputtedOperator);
    updateDisplay();
    calculationArray.push(stringNumberToPush);
    console.log(calculationArray);
    calculationArray.push(inputtedOperator);
    stringNumberToPush = "";
  });
  $('#equals').on('click', function equalsButtonHandler(event){
    console.log(event);
    calculationArray.push(stringNumberToPush);
    stringNumberToPush = "";
    displayArray = [];
    console.log(calculationArray);
  });
}

function updateDisplay (){
  var displayText = displayArray.join("");
  $('#display-text').text(displayText);
}
