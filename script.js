const calculator = {
    a:          false,
    b:          false,
    operation:  false,
    add:        function() {return this.a + this.b},
    subtract:   function() {return this.a - this.b},
    divide:     function() {return this.b === 0 ? 'mathError' : this.a / this.b},
    multiply:   function() {return this.a * this.b},
    getResult:  function() {
                            if      (this.operation==='add')        return this.add()
                            else if (this.operation==='subtract')   return this.subtract()
                            else if (this.operation==='divide')     return this.divide()
                            else                                    return this.multiply()},
    refresh:    function() {this.a = false;
                            this.b = false; 
                            this.operation = false},
}

document.querySelectorAll(".numbers > input").forEach(
    button => button.addEventListener("mousedown", function(e) {
        if (calculator.a === false) calculator.a = Number(e.target.id)
        else { //If there's a number (a) already
            calculator.b = Number(e.target.id);
            console.log( calculator.getResult() );
            calculator.refresh();
        }
    })
);

document.getElementById("+").addEventListener("mousedown", () => calculator.operation = 'add');
document.getElementById("-").addEventListener("mousedown", () => calculator.operation = 'subtract');
document.getElementById("*").addEventListener("mousedown", () => calculator.operation = 'multiply');
document.getElementById("/").addEventListener("mousedown", () => calculator.operation = 'divide');