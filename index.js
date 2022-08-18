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
	if ((secondInput = 0)) {
		return "indivisible";
	}
	return firstInput / secondInput;
};

const exponent = function (firstInput, secondInput) {
	return Math.pow(firstInput, secondInput);
};

const root = function (firstInput) {
	return Math.sqrt(firstInput);
};
