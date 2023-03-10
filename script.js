const calculator = {
    display:                document.querySelector(".display"),
    numbers:                document.querySelectorAll(".numbers > input"),
    operations:             document.querySelectorAll(".actions > .operation"),
    decimal:                document.getElementById("."),
    percentage:             document.getElementById("%"),
    backSpace:              document.getElementById("removelast"),
    ac:                     document.getElementById("clear"),
    equal:                  document.getElementById("equal"),
    a:                      false,
    b:                      false,
    chosenOperation:        false,
    add()                   {return Number(this.a) + Number(this.b)},
    subtract()              {return Number(this.a) - Number(this.b)},
    divide()                {return Number(this.b) === 0 ? 'mathError' : Number(this.a) / Number(this.b) },
    multiply()              {return Number(this.a) * Number(this.b)},
    pickNum(num)            {
                                if (this.chosenOperation === false) {
                                    this.a === false || this.a === 'mathError' ? 
                                    this.a = num : 
                                    this.a = `${this.a}${num}`;
                                }
                                else {
                                    this.b === false ? this.b = num : this.b = `${this.b}${num}`;
                                }
                            },
    pickOperator(operator)  {
                                if (this.a === 'mathError') return
                                if (this.chosenOperation === false) this.chosenOperation = operator; 
                                if (this.a === false) this.a = 0;
                            },
    addDecimal()            {
                                if (this.b !== false) {
                                    if (this.b.includes('.')) return;
                                    else this.b += '.'
                                }
                                else if (this.a !== false && this.a !== 'mathError') {
                                    if (this.a.includes('.')) return;
                                    else this.a += '.'
                                }
                            },
    getResult()             {   
                                if (this.chosenOperation === false)  return
                                if (this.chosenOperation === '+')    return this.add()
                                if (this.chosenOperation === '-')    return this.subtract()
                                if (this.chosenOperation === '*')    return this.multiply()
                                if (this.chosenOperation === '/')    return this.divide()
                            },
    removeLast()             {   
                                if (this.b !== false) {
                                    // let numToString = this.b.toString();
                                    // if (numToString.length > 1) this.b = Number(numToString.slice(0, numToString.length - 1))
                                    // else this.b = false
                                    if (this.b.length > 1) this.b = this.b.slice(0, this.b.length - 1);
                                    else this.b = false
                                }
                                else if (this.chosenOperation !== false) this.chosenOperation = false
                                else if (this.a !== false) {
                                    // let numToString = this.a.toString();
                                    // if (numToString.length > 1) this.a = Number(numToString.slice(0, numToString.length - 1))
                                    // else this.a = false
                                    if (this.a.length > 1) this.a = this.a.slice(0, this.a.length - 1);
                                    else this.a = false
                                }
                                else if (this.a === 'mathError') this.a = false;
                            },
    clear()                 {
                                this.a = false;
                                this.b = false;
                                this.chosenOperation = false;
                                calculator.display.textContent = '';
                            },
    refreshDisplay()        {
                                let num1; let operator; let num2;

                                this.a === false ? num1 = '' : num1 = this.a;
                                this.b === false ? num2 = '' : num2 = this.b;
                                this.chosenOperation === false ? operator = '' : operator = this.chosenOperation;

                                // if (num1.includes(".")) num1 = num1.toFixed(1);
                                // if (num2.includes(".")) num2 = num2.toFixed(1);

                                this.display.textContent = num1 + operator + num2;
                            },
    checkComplete()         {
                                if (this.b !== false) {
                                    this.a = this.getResult();
                                    this.b = false;
                                    this.chosenOperation = false
                                }
                            }
};

calculator.numbers.forEach (
    number => number.addEventListener (
        "mousedown",
        (e) => {
            calculator.pickNum(e.target.id);
            calculator.refreshDisplay()
        } 
    )
);

calculator.decimal.addEventListener (
    "mousedown",
    () => {
        calculator.addDecimal();
        calculator.refreshDisplay()
    }
)

calculator.operations.forEach (
    operation => operation.addEventListener (
        "mousedown",
        (e) => {
            calculator.checkComplete();
            calculator.pickOperator(e.target.value);
            calculator.refreshDisplay()
        } 
    )
);

calculator.backSpace.addEventListener (
    "mousedown",
    () => {
        calculator.removeLast();
        calculator.refreshDisplay()
    } 
);

calculator.ac.addEventListener (
    "mousedown",
    () => {
        calculator.clear();
        calculator.refreshDisplay()
    } 
);

calculator.equal.addEventListener (
    "mousedown",
    () => {
        calculator.checkComplete();
        calculator.refreshDisplay()
    }
)