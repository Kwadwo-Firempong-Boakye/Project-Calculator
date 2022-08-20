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
		return output.toExponential(9);
	} else {
		return output;
	}
};

///////////////////////////////////////////////////////////////////////

//Global Variables
let input = "";

//DOM Definitions

let displayText = document.querySelector(".calc-text");
const calcButtons = document.querySelectorAll(".button");

//DOM Event Listeners
window.addEventListener("keydown", keyboardSupport);

calcButtons.forEach((button) => {
	button.addEventListener("click", clickSupport);
});

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


function stringToNumber (string) {
	return +(string);
}
