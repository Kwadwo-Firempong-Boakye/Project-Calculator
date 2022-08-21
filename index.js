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
		return "indivisible";
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

	if (
		(output < 1 && output.toString().length > 9) ||
		output.toString().length > 9
	) {
		return output.toExponential(4);
	} else {
		return output;
	}
};

///////////////////////////////////////////////////////////////////////

//Global Variables
let input = "";
let firstInputValue = 0;
let secondInputValue = 0;
let operatorValue = "";
let currentDisplayValue = 0;

//DOM Definitions

let displayText = document.querySelector(".calc-text");
let displaySubtext = document.querySelector(".calc-subtext");
const calcButtons = document.querySelectorAll(".button");
let operatorButtons = document.querySelectorAll(".operator");
const enterButton = document.querySelector(".enter");

//DOM Event Listeners
window.addEventListener("keydown", keyboardSupport);

calcButtons.forEach((button) => {
	button.addEventListener("click", clickSupport);
});

operatorButtons.forEach((button) => {
	button.addEventListener("keydown", mountInitialValues);
	button.addEventListener("click", mountInitialValues);
});

enterButton.addEventListener("click", startOperation);

//DOM Functions

function keyboardSupport(e) {
	const keyButton = document.querySelector(`.button[data-key="${e.key}"]`);

	if (keyButton !== null) {
		let isDisplayEligible = keyButton.getAttribute("data-display");
		if (isDisplayEligible == "yes" && input.length < 9) {
			input += keyButton.innerText;
		}
	}
	displayText.innerText = input;
}

function clickSupport(e) {
	const clickedButton = e.target;
	let isDisplayEligible = clickedButton.getAttribute("data-display");

	if (isDisplayEligible == "yes" && input.length < 9) {
		input += clickedButton.innerText;
	}

	displayText.innerText = input;
}

// Calculator Procedure Functions

function mountInitialValues (e) {
	operatorValue = e.target.getAttribute("data-key");

	if (currentDisplayValue != 0) {
		firstInputValue = +(currentDisplayValue);
		displaySubtext.innerText = `${currentDisplayValue} ${operatorValue}`;
	} else {
		firstInputValue = +(input);
		displaySubtext.innerText = `${firstInputValue} ${operatorValue}`;
	}

	input = "";
	displayText.innerText = input;
}

function startOperation () {
	secondInputValue = +(input);
	displaySubtext.innerText += ` ${secondInputValue}`;
	currentDisplayValue = operate(firstInputValue, operatorValue, secondInputValue);
	displayText.innerText = currentDisplayValue;
}

