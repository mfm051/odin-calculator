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
                                    this.a === false ? this.a = num : this.a = Number (`${this.a}${num}`)
                                }
                                else {
                                    this.b === false ? this.b = num : this.b = Number (`${this.b}${num}`)
                                }
                            },
    pickOperator(operator)  {this.chosenOperation = operator; if (this.a === false) this.a = 0},
    getResult()             {   
                                if (this.chosenOperation === false)         return
                                if (this.chosenOperation === 'add')         return this.add()
                                if (this.chosenOperation === 'subtract')    return this.subtract()
                                if (this.chosenOperation === 'multiply')    return this.multiply()
                                if (this.chosenOperation === 'divide')      return this.divide()
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
    clearAll()              {
                                this.a = false;
                                this.b = false;
                                this.chosenOperation = false
                            }
};

calculator.numbers.forEach (
    number => number.addEventListener (
        "mousedown",
        (e) => calculator.pickNum(Number(e.target.id))
    )
);

calculator.operations.forEach (
    operation => operation.addEventListener (
        "mousedown",
        (e) => calculator.pickOperator(e.target.id)
    )
);

calculator.backSpace.addEventListener (
    "mousedown",
    () => calculator.removeLast()
);
