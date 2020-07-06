function calcular(infija) {
    let posfija = infAPosPlus(infija)

    let str = ''
    for(var i=0; i<posfija.size(); i++){
        str += posfija.get(i).info + "   "
        
    }

    let resultado = evaluarPlus(posfija)

    data = {
        posfijo: posfija.getInfo(),
        resultado
    }
    
    console.log(str)
    console.log(evaluarPlus(posfija))
    return data
}




function infAPosPlus(infija) {
    let pila = new Pila()
    let posfija = new Lista()
    let letra = ''
    pila.initPm()
    let list = new Lista()

    for (var j = 0; j < infija.length; j++) {
        let letraUnic = infija[j];
        if (letraUnic.hashCode() >= 48 && letraUnic.hashCode() <= 57) {
            letra = letra.concat(letraUnic);
        } else if (esOperador(letraUnic)) {
            if(!letra == ''){
                list.add(letra);
            }
            list.add(letraUnic);
            letra = '';
        }
    }
    list.add(letra);

    // console.log(list.getInfo().info)

    console.log(list.size())
    for (var i = 0; i < list.size(); i++) {
        // console.log(list.get(i))
        let caracter = list.get(i).info
        if (esOperador(caracter)) {
            if (pila.vaciaPm()) {
                pila.insPm(caracter)
            } else {

                if (prioridadEnExpresion(caracter) > prioridadEnPila(pila.cabeza().info)) {
                    pila.insPm(caracter)
                } else {
                    if (caracter == ')') {
                        while (pila.cabeza().info !== '(') {
                            posfija.add(pila.retiraPm())
                        }
                        pila.retiraPm()
                    } else {
                        posfija.add(pila.retiraPm())
                        pila.insPm(caracter)
                    }


                }

            }
        } else {
            posfija.add(caracter)
        }
    }


    while (!pila.vaciaPm()) {
        posfija.add(pila.retiraPm())
    }

    return posfija
}


function infAPos(infija) {
    let pila = new Pila()
    let posfija = ""
    pila.initPm()
    for (var i = 0; i < infija.length; i++) {
        let caracter = infija[i]
        if (esOperador(caracter)) {
            if (pila.vaciaPm()) {
                pila.insPm(caracter)
            } else {

                if (prioridadEnExpresion(caracter) > prioridadEnPila(pila.cabeza().info)) {
                    pila.insPm(caracter)
                } else {
                    if (caracter == ')') {
                        while (pila.cabeza().info !== '(') {
                            posfija = posfija.concat(pila.retiraPm())
                        }
                        pila.retiraPm()
                    } else {
                        posfija = posfija.concat(pila.retiraPm())
                        pila.insPm(caracter)
                    }

                }

            }
        } else {
            posfija = posfija.concat(caracter)
        }
    }


    while (!pila.vaciaPm()) {
        posfija = posfija.concat(pila.retiraPm())
    }

    return posfija
}


function evaluarPlus(posfija) {
    let pila = new Pila()
    pila.initPm()
    for (var i = 0; i < posfija.size(); i++) {
        let caracter = posfija.get(i).info
        console.log(caracter)
        if (!esOperador(caracter)) {
            let num = parseFloat(caracter)
            pila.insPm(num)
        } else {
            let num2 = pila.retiraPm();
            let num1 = pila.retiraPm();
            let num3 = operacion(caracter, num1, num2)
            pila.insPm(num3)
        }
    }
    return pila.cabeza().info
}



function evaluar(posfija) {
    let pila = new Pila()
    pila.initPm()
    for (var i = 0; i < posfija.length; i++) {
        let caracter = posfija[i]
        if (!esOperador(caracter)) {
            let num = parseFloat(caracter)
            pila.insPm(num)
        } else {
            let num2 = pila.retiraPm();
            let num1 = pila.retiraPm();
            let num3 = operacion(caracter, num1, num2)
            pila.insPm(num3)
        }
    }
    return pila.cabeza().info
}

function operacion(caracter, num1, num2) {
    if (caracter == '*') { return num1 * num2 }
    if (caracter == '/') { return num1 / num2 }
    if (caracter == '+') { return num1 + num2 }
    if (caracter == '-') { return num1 - num2 }
    if (caracter == '^') { return Math.pow(num1, num2) }



}

function prioridadEnExpresion(operador) {
    if (operador == '+') { return 1 }
    if (operador == '-') { return 1 }
    if (operador == '*') { return 2 }
    if (operador == '/') { return 2 }
    if (operador == '^') { return 4 }
    if (operador == '(') { return 5 }
    if (operador == ')') { return 0 }

}

function prioridadEnPila(operador) {
    if (operador == '+') { return 1 }
    if (operador == '-') { return 1 }
    if (operador == '*') { return 2 }
    if (operador == '/') { return 2 }
    if (operador == '^') { return 3 }
    if (operador == '(') { return 0 }
    if (operador == ')') { return 0 }

}


function esOperador(x) {
    let operadores = ['+', '-', '/', '*', '^', '(', ')']
    for (var i = 0; i < operadores.length; i++) {
        if (x == operadores[i]) {
            return true
        }
    }
    return false
}

Object.defineProperty(String.prototype, 'hashCode', {
    value: function () {
        var hash = 0, i, chr;
        for (i = 0; i < this.length; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
});

