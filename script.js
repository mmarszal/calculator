function sign(a) {
    return a * -1;
}

const operatorTable = {
    "+" : (a, b) => a + b,
    "-" : (a, b) => a - b,
    "*" : (a, b) => a * b,
    "/" : (a, b) => a / b,
    "%" : (a, b) => a % b,
    "+/-" : a => -a
};

const State = Object.freeze({
    Input : 0,
    Operator : 1
});

let displayValue = '0';
let state = State.Input;

let op = undefined;
let total = undefined;

let display = document.querySelector('.display');

let operators = document.querySelectorAll('.operator');
operators.forEach(node => {
    node.addEventListener('click', e => {
        let opFunc = operatorTable[e.target.textContent];
        if (!opFunc) {
            return;
        }

        if (state === State.Operator) {
            op = opFunc;
            return;
        }

        if (op) {
            total = op(total, parseInt(display.textContent));
            op = opFunc;
            display.textContent = total;
        } else {
            total = parseInt(display.textContent);
            op = opFunc;
        }

        state = State.Operator;

        console.log(opFunc)
    });
});

let operands = document.querySelectorAll('.operand');
operands.forEach(node => {
    node.addEventListener('click', e => {
        let operand = e.target.textContent;

        if (state === State.Input) {
            if (displayValue === '0' || displayValue === '-0') {
                displayValue = operand;
            } else {
                displayValue += operand;
            }
        } else {
            state = State.Input;
            displayValue = operand;
            display.textContent = displayValue;
        }

        display.textContent = displayValue;
        console.log(displayValue);
    });
});

let clear = document.querySelector('.clear');
clear.addEventListener('click', e => {
    displayValue = '0';
    display.textContent = displayValue;
    state = State.Input;
    op = undefined;
    total = undefined;
});

let s = document.querySelector('.sign');
s.addEventListener('click', e => {
    if (state = State.Operator) {
        return;
    }

    if (displayValue === '0') {
        return;
    }

    displayValue = parseInt(displayValue) * -1;
    console.log(displayValue);
    display.textContent = displayValue;
});

let sum = document.querySelector('.sum');
sum.addEventListener('click', e => {
    if (state === State.Operator) {
        return;
    }

    if (total === undefined || op === undefined) {
        return;
    }

    total = op(total, parseInt(display.textContent));
    displayValue = total;
    display.textContent = displayValue;
});