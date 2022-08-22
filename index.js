//Global Variables
let input = "";
let firstInputValue;
let secondInputValue;
let operatorValue;
let tempOperatorValue;
let currentOperationValue = 0;
let operationsCount = 0;

//Calculator Operator Functions

const add = function (firstInput, secondInput) {
	return firstInput + secondInput;
};

const subtract = function (firstInput, secondInput) {
	return firstInput - secondInput;
};

const multiply = function (firstInput, secondInput) {
	return firstInput * secondInput;
};

const divide = function (firstInput, secondInput) {
	if (secondInput === 0) {
		return 0;
	} else {
		return firstInput / secondInput;
	}
};

const exponent = function (firstInput, secondInput) {
	return Math.pow(firstInput, secondInput);
};

const root = function (firstInput) {
	return Math.sqrt(firstInput);
};

// Calculator Operate Function

const operate = function (firstInput, operator, secondInput) {
	//Document that operation has been called
	operationsCount++;

	//Begin Operation
	let output;

	switch (operator) {
		case "+":
			output = add(firstInput, secondInput);
			break;
		case "-":
			output = subtract(firstInput, secondInput);
			break;
		case "*":
			output = multiply(firstInput, secondInput);
			break;
		case "/":
			output = divide(firstInput, secondInput);
			break;
		case "exp":
			output = exponent(firstInput, secondInput);
			break;
		case "root":
			output = root(firstInput);
			break;
		default:
			output = 0;
			break;
	}

	//Limit Output Length

	if (output.toString().length > 9) {
		return output.toExponential(4);
	} else {
		return output;
	}
};

///////////////////////////////////////////////////////////////////////

//DOM Definitions

let displayText = document.querySelector(".calc-text");
let displaySubtext = document.querySelector(".calc-subtext");
const calcButtons = document.querySelectorAll(".button");
let operatorButtons = document.querySelectorAll(".operator");
const enterButton = document.querySelector(".enter");
const clearButton = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");

//DOM Event Listeners
// window.addEventListener("keydown", keyboardSupport);

calcButtons.forEach((button) => {
	button.addEventListener("click", clickSupport);
});

operatorButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		operatorValue = e.target.getAttribute("data-key");
		mountInitialValues(e);
	});
});

clearButton.addEventListener("click", resetGlobal);

// enterButton.addEventListener("click", startOperation);

//DOM Functions

function clickSupport(e) {
	const clickedButton = e.target;
	let isBackspace = clickedButton.getAttribute("data-key");
	let isDisplayEligible = clickedButton.getAttribute("data-display");

	if (isBackspace == "Backspace") {
		let updatedInput = input.slice(0, input.length - 1);
		input = updatedInput;
	} else if (isDisplayEligible == "yes" && input.length < 9) {
		input += clickedButton.innerText;
	}

	displayText.innerText = input;
}

// Calculator Procedure Functions

function mountInitialValues(e) {

	if (operationsCount == 0) { 
		if (+input == 0) {
			displaySubtext.innerText = `${currentOperationValue} ${operatorValue}`;
			input = "";
			displayText.innerText = input;
			tempOperatorValue = operatorValue;

		} else {
			if (tempOperatorValue === undefined) {
				tempOperatorValue = operatorValue;
			}

			if (currentOperationValue == 0 && (operatorValue == "*" || operatorValue == "/")) {
				currentOperationValue = 1;
			}

			firstInputValue = +input;
			currentOperationValue = operate(firstInputValue, tempOperatorValue, currentOperationValue);
			displaySubtext.innerText = `${currentOperationValue} ${operatorValue}`;
			input = "";
			displayText.innerText = input;
			tempOperatorValue = operatorValue;

		}

	} else if (operationsCount > 0) {

		if (input == "") {
			//Do not operate. Just change operation variables
			displaySubtext.innerText = `${currentOperationValue} ${operatorValue}`;
			input = "";
			displayText.innerText = input;
			tempOperatorValue = operatorValue;

		} else {
			secondInputValue = +input;
			currentOperationValue = operate(
				currentOperationValue,
				tempOperatorValue,
				+secondInputValue
			);
			displaySubtext.innerText = `${currentOperationValue} ${operatorValue}`;
			tempOperatorValue = operatorValue;
			input = "";
			displayText.innerText = input;

		}


	}
}

// function startOperation () {
// 	secondInputValue = +input;
// 	displaySubtext.innerText += ` ${secondInputValue}`;
// 	currentOperationValue = operate(
// 		firstInputValue,
// 		operatorValue,
// 		secondInputValue
// 	);
// 	displayText.innerText = currentOperationValue;
// 	input = "";
// }

function resetGlobal() {
	input = "";
	firstInputValue = 0;
	secondInputValue = 0;
	operatorValue = "";
	currentOperationValue = 0;
	displayText.innerText = currentOperationValue;
	displaySubtext.innerText = currentOperationValue;
}

// function keyboardSupport(e) {
// 	const keyButton = document.querySelector(`.button[data-key="${e.key}"]`);

// 	if (keyButton !== null) {
// 		let isBackspace = keyButton.getAttribute("data-key");
// 		let isDisplayEligible = keyButton.getAttribute("data-display");
// 		let isOperator = keyButton.getAttribute("class");
// 		let isEnter = keyButton.getAttribute("data-key");

// 		if (isBackspace == "Backspace") {
// 			let updatedInput = input.slice(0, input.length - 1);
// 			input = updatedInput;
// 			displayText.innerText = input;

// 		} else if (isDisplayEligible == "yes" && input.length < 9) {
// 			if (currentOperationValue !== 0) {
// 				resetGlobal();
// 			}
// 			input += keyButton.innerText;
// 			displayText.innerText = input;
// 		}
// } else if (isOperator == "operator button") {
// 	operatorValue = keyButton.getAttribute("data-key");
// 	mountInitialValues();
// 	displayText.innerText = input;
// }
// } else if (isEnter == "Enter") {
// 	startOperation();
// }
// 	}
// }

//if input is blank and operator is * or / then second input = 1