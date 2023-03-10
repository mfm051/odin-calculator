const calculator = {
    display:                document.querySelector(".display"),
    numbers:                document.querySelectorAll(".numbers > input"),
    operations:             document.querySelectorAll(".actions > .operation"),
    backSpace:              document.getElementById("removelast"),
    ac:                     document.getElementById("clear"),
    equal:                  document.getElementById("equal"),
    a:                      false,
    b:                      false,
    chosenOperation:        false,
    add()                   {return this.a + this.b},
    subtract()              {return this.a - this.b},
    divide()                {return this.b === 0 ? 'mathError' : this.a / this.b },
    multiply()              {return this.a * this.b},
    pickNum(num)            {
                                if (this.chosenOperation === false) {
                                    this.a === false ? this.a = num : this.a = Number (`${this.a}${num}`);
                                }
                                else {
                                    this.b === false ? this.b = num : this.b = Number (`${this.b}${num}`)
                                }
                            },
    pickOperator(operator)  {
                                if (this.chosenOperation === false) this.chosenOperation = operator; 
                                if (this.a === false) this.a = 0},
    getResult()             {   
                                if (this.chosenOperation === false)         return
                                if (this.chosenOperation === '+')         return this.add()
                                if (this.chosenOperation === '-')    return this.subtract()
                                if (this.chosenOperation === '*')    return this.multiply()
                                if (this.chosenOperation === '/')      return this.divide()
                            },
    removeLast()             {   
                                if (this.b !== false) {
                                    let numToString = this.b.toString();
                                    if (numToString.length > 1) this.b = Number(numToString.slice(0, numToString.length - 1))
                                    else this.b = false
                                }
                                else if (this.chosenOperation !== false) this.chosenOperation = false
                                else if (this.a !== false) {
                                    let numToString = this.a.toString();
                                    if (numToString.length > 1) this.a = Number(numToString.slice(0, numToString.length - 1))
                                    else this.a = false
                                }
                                else return
                            },
    clear()                 {
                                this.a = false;
                                this.b = false;
                                this.chosenOperation = false;
                                calculator.display.textContent = '';
                            },
    // print(toPrint)          {
    //                             calculator.display.textContent += toPrint;
    //                         }
    refreshDisplay()        {
                                let num1; let operator; let num2;

                                this.a === false ? num1 = '' : num1 = this.a;
                                this.b === false ? num2 = '' : num2 = this.b;
                                this.chosenOperation === false ? operator = '' : operator = this.chosenOperation;

                                this.display.textContent = num1 + operator + num2;
                            }
};

// calculator.display.textContent = '';

calculator.numbers.forEach (
    number => number.addEventListener (
        "mousedown",
        (e) => {
            calculator.pickNum(Number(e.target.id));
            calculator.refreshDisplay()
        } 
    )
);

calculator.operations.forEach (
    operation => operation.addEventListener (
        "mousedown",
        (e) => {
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