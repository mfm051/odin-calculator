const calculator = {
    numbers:    document.querySelectorAll(".numbers > input"),
    actions:    document.querySelectorAll(".actions > input"),
    add()       {return this.a + this.b},
    subtract()  {return this.a - this.b},
    divide()    {return this.b === 0 ? 'mathError' : this.a / this.b },
    multiply()  {return this.a * this.b},
};

calculator.actions.forEach(
  () => addEventListener("mousedown", 
    function(e) {
        if (e.target.id === 'add')      calculator.result = calculator.add();
        if (e.target.id === 'subtract') calculator.result = calculator.subtract();
        if (e.target.id === 'divide')   calculator.result = calculator.divide();
        if (e.target.id === 'multiply') calculator.result = calculator.multiply();
    }
  )
)