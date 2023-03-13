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
                                    if (this.b.length > 1) this.b = this.b.slice(0, this.b.length - 1);
                                    else this.b = false
                                }
                                else if (this.chosenOperation !== false) this.chosenOperation = false
                                else if (this.a !== false && this.a !== 'mathError') {
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

                                if (num1.includes(".")) num1 = num1.slice(0, num1.indexOf('.') + 4)
                                if (num2.includes(".")) num2 = num2.slice(0, num2.indexOf('.') + 4)

                                this.display.textContent = num1 + operator + num2;
                            },
    checkComplete()         {
                                if (this.b !== false) {
                                    this.a = this.getResult().toString(); // a must be string to check for decimals
                                    this.b = false;
                                    this.chosenOperation = false
                                }
                            },
    scrollToEnd()           {
                                calculator.display.scrollLeft = calculator.display.scrollWidth
                            },
    scrollToStart()         {
                                calculator.display.scrollLeft = -calculator.display.scrollWidth
                            },    
};

calculator.numbers.forEach (
    number => number.addEventListener (
        "mousedown", 
        function (e) {
            calculator.pickNum(e.target.value);
            calculator.refreshDisplay();
            calculator.scrollToEnd()
        }
    )
);

calculator.decimal.addEventListener(
    "mousedown",
    function () {
        calculator.addDecimal();
        calculator.refreshDisplay()
    }
);

calculator.operations.forEach(
    operation => operation.addEventListener(
        "mousedown",
        function (e) {
            calculator.checkComplete();
            calculator.pickOperator(e.target.value);
            calculator.refreshDisplay();
            calculator.scrollToEnd()
        }
    )
);

calculator.backSpace.addEventListener (
    "mousedown",
    function () {
        calculator.removeLast();
        calculator.refreshDisplay();
    } 
);

calculator.ac.addEventListener (
    "mousedown",
    function () {
        calculator.clear();
        calculator.refreshDisplay()
    } 
);

calculator.equal.addEventListener (
    "mousedown",
    function () {
        calculator.checkComplete();
        calculator.refreshDisplay();
        calculator.scrollToStart()
    }
);

document.addEventListener (
    "keydown", 
    function (e) {
        const nums = [0,1,2,3,4,5,6,7,8,9];
        if (nums.includes(Number(e.key))) {
            calculator.pickNum(e.key);
            calculator.refreshDisplay();
            calculator.scrollToEnd()
        };

        if (e.key === '.') {
            calculator.addDecimal();
            calculator.refreshDisplay()
        };

        const ops = ['+','-','*','/'];
        if (ops.includes(e.key)) {
            e.preventDefault(); // "/" key is "quick find" in firefox
            calculator.checkComplete();
            calculator.pickOperator(e.key);
            calculator.refreshDisplay();
            calculator.scrollToEnd()
        };

        if (e.key === "Backspace") {
            calculator.removeLast();
            calculator.refreshDisplay()
        };

        if (e.key === "Delete") {
            calculator.clear();
            calculator.refreshDisplay()
        };

        if (e.key === "Enter") {
            calculator.checkComplete();
            calculator.refreshDisplay();
            calculator.scrollToStart()
        }
    }
)