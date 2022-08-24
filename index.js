//Global Variables
let input = "";
let firstInputValue;
let secondInputValue;
let operatorValue;
let tempOperatorValue;
let currentOperationValue = 0;
let operationsCount = 0;
let endOperationCount = 0;
let operateButtonPressCount = 0;
let isZeroInput = "no";

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
		return output.toPrecision(5);
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
let decimal = document.querySelector(".decimal");
let negativePositive = document.querySelector(".corner");
let fraction = document.querySelector(".special-operator-1");

//DOM Event Listeners
window.addEventListener("keydown", keyboardSupport);

calcButtons.forEach((button) => {
	button.addEventListener("click", clickSupport);
});

operatorButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		operatorValue = e.target.getAttribute("data-key");
		startOperations();
	});
});

clearButton.addEventListener("click", resetGlobal);

enterButton.addEventListener("click", endOperation);

negativePositive.addEventListener("click", negate);

fraction.addEventListener("click", turnFraction);

//DOM Functions

function clickSupport(e) {
	const clickedButton = e.target;
	let isBackspace = clickedButton.getAttribute("data-key");
	let isDisplayEligible = clickedButton.getAttribute("data-display");

	if (isBackspace == "Backspace") {
		let updatedInput = input.slice(0, input.length - 1);
		input = updatedInput;
	} else if (isDisplayEligible == "yes" && input.length < 9) {
		if (endOperationCount != 0 && operateButtonPressCount == 0) {
			resetGlobal();
		}

		input += clickedButton.innerText;

		if (input.includes(".")) {
			decimal.setAttribute("data-display", "no");
		} else {
			decimal.setAttribute("data-display", "yes");
		}
	}
	displayText.innerText = input;
}

function keyboardSupport(e) {
	const keyButton = document.querySelector(`.button[data-key="${e.key}"]`);

	if (keyButton !== null) {
		let isBackspace = keyButton.getAttribute("data-key");
		let isDisplayEligible = keyButton.getAttribute("data-display");
		let isOperator = keyButton.getAttribute("class");
		let isEnter = keyButton.getAttribute("data-key");

		if (isBackspace == "Backspace") {
			let updatedInput = input.slice(0, input.length - 1);
			input = updatedInput;
			displayText.innerText = input;
		} else if (isDisplayEligible == "yes" && input.length < 9) {
			if (endOperationCount != 0 && operateButtonPressCount == 0) {
				resetGlobal();
			}
			input += keyButton.innerText;

			if (input.includes(".")) {
				decimal.setAttribute("data-display", "no");
			} else {
				decimal.setAttribute("data-display", "yes");
			}

			displayText.innerText = input;
		} else if (isOperator == "operator button") {
			operatorValue = keyButton.getAttribute("data-key");
			startOperations();
			// displayText.innerText = input;
		} else if (isEnter == "Enter") {
			endOperation();
		}
	}
}

// Calculator Procedure Functions

function startOperations() {
	operateButtonPressCount++;

	if (operationsCount == 0) {
		if (+input == 0) {
			displaySubtext.innerText = `${currentOperationValue} ${operatorValue}`;
			input = "";
			displayText.innerText = input;
			tempOperatorValue = operatorValue;
			isZeroInput = "yes";
		} else {
			if (tempOperatorValue === undefined) {
				tempOperatorValue = operatorValue;
			}

			if (
				currentOperationValue == 0 &&
				(operatorValue == "*" || operatorValue == "/") &&
				isZeroInput == "no"
			) {
				currentOperationValue = 1;
			} else if (
				currentOperationValue == 0 &&
				(operatorValue == "*" || operatorValue == "/") &&
				isZeroInput == "yes"
			) {
				currentOperationValue = 0;
			}

			firstInputValue = +input;
			currentOperationValue = operate(
				firstInputValue,
				tempOperatorValue,
				currentOperationValue
			);

			if (currentOperationValue.length > 9) {
				let fixedLength = (+currentOperationValue).toPrecision(5);
				currentOperationValue = fixedLength;
			}

			displaySubtext.innerText = `${currentOperationValue} ${operatorValue}`;
			input = "";
			displayText.innerText = input;
			tempOperatorValue = operatorValue;
			isZeroInput = "no";
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

			if (currentOperationValue.length > 9) {
				let fixedLength = (+currentOperationValue).toPrecision(5);
				currentOperationValue = fixedLength;
			}

			displaySubtext.innerText = `${currentOperationValue} ${operatorValue}`;
			tempOperatorValue = operatorValue;
			input = "";
			displayText.innerText = input;
		}
	}
}

function endOperation() {
	//display currentvalue in main display and subdisplay, set input to empty, set operatorvalue to empty
	startOperations();
	displayText.innerText = currentOperationValue;
	displaySubtext.innerText = currentOperationValue;
	endOperationCount++;
	operateButtonPressCount = 0;
}

function resetGlobal() {
	input = "";
	firstInputValue = undefined;
	secondInputValue = undefined;
	operatorValue = undefined;
	tempOperatorValue = undefined;
	currentOperationValue = 0;
	operationsCount = 0;
	endOperationCount = 0;
	displayText.innerText = currentOperationValue;
	displaySubtext.innerText = currentOperationValue;
	operateButtonPressCount = 0;
}

function negate() {
	let neg = "-";
	if (Math.sign(input) > 0) {
		input = neg.concat(input);
	} else if (Math.sign(input) < 0) {
		input = input.slice(1);
	} else if ((input = "")) {
		return;
	}
	displayText.innerText = input;
}

function turnFraction() {
	if (input != "") {
		input = (1 / +input);
		
		if (input == Infinity || input == -Infinity){
			input = 0;
		}
		
		input = input.toString()

		if (input.length > 8) {
			alert(`Sorry, this calculator can only process figures with less than 10 digits. \n\nYour calculated number: ${input} will be supported in an update soon. \n\nThank you for testing my build.`)
			resetGlobal();
		}

		displayText.innerText = input;


	} else {
		currentOperationValue = 1 / +currentOperationValue;
		let strVersion = currentOperationValue.toString();
		if (strVersion.length > 8) {
			alert(`Sorry, this calculator can only process figures with less than 10 digits. \n\nYour calculated number: ${currentOperationValue} will be supported in an update soon. \n\nThank you for testing my build.`)
			resetGlobal();
		}

		if (currentOperationValue == Infinity || currentOperationValue == -Infinity){
			currentOperationValue = 0;
		}

		displayText.innerText = currentOperationValue;

	}

	endOperationCount++;
	operateButtonPressCount = 0;
	
}

///SOLVE TURN FRACTION USE ON OUTPUT AND IN MOTION
