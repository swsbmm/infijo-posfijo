function calcular(infija) {
    let posfija = infAPosPlus(infija)
    let resultado = evaluarPlus(infAPosPlus(infija))
    let resultado1 = evaluar(posfija.getInfo())
    console.log(`resultado1: ${resultado1}`)
    console.log(resultado)
    if(isNaN(resultado)){
        resultado = 'Faltan datos'
    }
    if(resultado == Number.POSITIVE_INFINITY){
        resultado = 'No se puede efectuar la operacion.'
    }
    data = {
        posfijo: posfija.getInfo(),
        resultado
    }
    let prueba = "."
    // console.log(`el hascode de ${prueba} es  ${prueba.hashCode()}`)
    console.log('Posfija: ', posfija.getInfo())
    console.log('Resultado: ', resultado)
    return data
}




function infAPosPlus(infija) {
    let pila = new Pila()  // Se crea la pila 
    let posfija = new Lista()   //se crea la lista para ir anotando la expresion en posfijo
    let letra = '' //variable donde voy a guardar temporalmente cada letra de la cadena de string
    pila.initPm() //hace que la pila este en null
    let list = new Lista() //otra lista donde se guardaran los elementos de la expresion
    let agregarPunto = true
    for (let j = 0; j < infija.length; j++) { //se recorre la cadena string que ingresa el usuario
        let letraUnic = infija[j];  // se guarda en esta variable cada char del string
        if (letraUnic.hashCode() >= 48 && letraUnic.hashCode() <= 57 || letraUnic.hashCode() == 46) {
            letra = letra.concat(letraUnic);

                //con esta comparacion se sabe si es un numero de 0 a 9
             // si es un numero entonces a letra le concatenamos lo que tenga letra, asi se puede juntar numero de mas de 2 dijitos
        } else if (esOperador(letraUnic)) { // si encontramos un operador entonces vamos a hacer lo siguiente
            if (!letra == '') { // si el numero es vacio no guardamos espacios en blanco pero si no entonces
                list.add(letra); // agregamos el numero que tenemos temporalmente guardada en este caso un operado a list
            }
            list.add(letraUnic); // agregamos el operador a la lista
            letra = ''; // borramos nuestra variable temporal para repetir el procedimiento segun la lontid de la cadena
            agregarPunto = true
        }
    }
    list.add(letra); // al final guardamos lo que nos quedo en nuestra expresion.
    
/// ALGORITMO DE POR COMPUTADOR FUNCIONAL
    let aux = ''
    let i =0
    let j = -1
    let elemento 
    while(i<list.size()){
        let caracter = list.get(i).info
        if(!esOperador(caracter)){
            if(caracter !== ''){
                console.log('HOLAAAAAAA MUNDO')
                posfija.add(caracter)
            }
            // posfija.add(caracter)
           
        }else{
            try {
                // console.log(`prioeridad entre ${caracter} Y ${pila.cabeza().info}`)    
            } catch (error) {
                
            }
            
            while(!pila.vaciaPm() && prioridadEnExpresion1(caracter,pila.cabeza().info) === 1){
                elemento = pila.retiraPm()
                posfija.add(elemento)
            }
            if(caracter !== ')'){
                pila.insPm(caracter)
            }else{
                pila.retiraPm()
            }
            
        }
        i++
    }

    while(!pila.vaciaPm()){
        elemento = pila.retiraPm()
        posfija.add(elemento)
    }



    // otro algoritmo pero falla



    // for (var i = 0; i < list.size(); i++) { // ahora vamos a recorrer la lista simple donde tenemos la expresion ingresada por el usuario
    //     let caracter = list.get(i).info // en una variable aux llamada caracter vamos a guardar el termino de la expresion y vamos a evaluarlo
    //     if (esOperador(caracter)) { //si es termino es un operador entonces
    //         if (pila.vaciaPm()) { // miramos si la pila esta vacia
    //             pila.insPm(caracter) // si esta vacia entonces metemos el operador
    //         } else { // si la pila no esta vacia entonces

    //             if (prioridadEnExpresion(caracter) > prioridadEnPila(pila.cabeza().info)) { //vamos a ver la prioridad de los operadores
    //                 pila.insPm(caracter) //miramos si el operador es de mayor gerarquia que el que se encuentra en la cabeza de la pila
    //                 // en caso de que sea mayor entonces se agrega el operador a la pila
    //             } else { // si el grado es menor entonces
    //                 if (caracter == ')') { // miramos si el caracter es un corchete a cerrar, si se cumple entonces
    //                     while (pila.cabeza().info !== '(') {
    //                          //pasamos todo lo que tengamos en la pila a posfijo 
    //                         posfija.add(pila.retiraPm()) //hasta que encontremos un corchete que abre o hasta que la pila quede vacia
    //                     }
    //                     let a = pila.retiraPm() // borramos el corchete que queda
    //                 } else { // en caso de que no sea un corchete que cierra entonces
    //                     posfija.add(pila.retiraPm()) // agregamos el a posfijo el ultimo elemento de la lista
    //                     pila.insPm(caracter) // y ponemos el nuevo operador
    //                 }
    //             }

    //         }
    //     } else {// si no es un operador 
    //         if (!caracter == '') {// si el caracter no esta vacio
    //             posfija.add(caracter) // agregamos a posfijo el caracter
    //         }

    //     }

    // }


    // while (!pila.vaciaPm()) { // este while pasa todo lo de pila a posfijo
    //     posfija.add(pila.retiraPm())
    // }

     return posfija //retornamos la lista posfija
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
        console.log(`caracter: ${caracter}`)
        if (!esOperador(caracter)) {
            let num = parseFloat(caracter)
            pila.insPm(num) 
        } else {
            let num2 = pila.retiraPm(); 
            let num1 = pila.retiraPm(); 
            let num3 = operacion(caracter, num1, num2) 
            pila.insPm(num3) 

            console.log(`${num1}  ${caracter}  ${num2} = ${num3}`)
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

function prioridadEnExpresion1(arreglo,pila) {
    let numarreglo = 0
    if (arreglo == '+') { numarreglo = 0 }
    if (arreglo == '-') { numarreglo = 1 }
    if (arreglo == '*') { numarreglo = 2 }
    if (arreglo == '/') { numarreglo = 3 }
    if (arreglo == '^') { numarreglo = 4 }
    if (arreglo == '(') { numarreglo = 5 }
    if (arreglo == ')') { numarreglo = 6 }

    
    let numpila = 0
    if (pila == '+') { numpila = 0 }
    if (pila == '-') { numpila = 1 }
    if (pila == '*') { numpila = 2 }
    if (pila == '/') { numpila = 3 }
    if (pila == '^') { numpila = 4 }
    if (pila == '(') { numpila = 5 }

    let matrizJerarquia = [ [1,1,0,0,0,0,1],
                            [1,1,0,0,0,0,1],
                            [1,1,1,1,0,0,1],
                            [1,1,1,1,0,0,1],
                            [1,1,1,1,1,0,1],
                            [0,0,0,0,0,0,0],]

    return matrizJerarquia[numpila][numarreglo]                        
}

function prioridadEnExpresion(operador) {
    if (operador == '+') { return 2 }
    if (operador == '-') { return 2 }
    if (operador == '*') { return 3 }
    if (operador == '/') { return 3 }
    if (operador == '^') { return 5 }
    if (operador == '(') { return 6 }
    if (operador == ')') { return 0 }

}

function prioridadEnPila(operador) {
    if (operador == '+') { return 2 }
    if (operador == '-') { return 2 }
    if (operador == '*') { return 3 }
    if (operador == '/') { return 3 }
    if (operador == '^') { return 4 }
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

