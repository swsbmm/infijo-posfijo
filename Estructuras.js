class Nodo{
    constructor(info){
        this.info = info
        this.sig = null
    }
}
class Pila{
    constructor(){
        this.p = null
    }

    initPm(){
        this.p = null
    }

    vaciaPm(){
        return (this.p === null)
    }

    insPm(s){
        let nuevo = new Nodo(s)
        nuevo.info = s
        nuevo.sig = this.p
        this.p = nuevo
    }

    retiraPm(){
        if(this.vaciaPm()){
            return '#' //Esta vacia
        }else{
            let q = this.p.sig
            let s = this.p.info
            this.p = q
            return s
        }
    }

    cabeza(){
        return this.p
    }

    listar(){
        let q = this.p
        // console.log(this.p.info)
        while(q !== null){
            console.log(" ", q.info)
            q = q.sig
        }
    }

}

class Lista{
    constructor(){
        this.cab = null
    }

    add(x){
        let p = new Nodo(x)
        let q = this.cab
        let s = null
        while(q !== null){
            s = q
            q = q.sig
        }
        if(s == null){
            this.cab = p
        }else{
            s.sig = p
        }
    }

    get(x){
        let q = this.cab
        let r = null
        for(var i = 0; i<= x; i++){
            r = q
            q = q.sig
        }
        return r
    }

    size(){
        let q = this.cab
        let l = 0
        while(q !== null){
            l = l+1
            q = q.sig
        }
        return l
    }

    getInfo(){
        let q = this.cab
        let l = ""
        while(q !== null){
            l = l.concat(q.info)
            q = q.sig
        }
        return l
    }

    
}




class Cola{
    constructor(){
        this.cola = new Nodo(-1)
        this.cola.sig = this.cola
    }

    sumar(objeto){
        let nuevo = new Nodo(objeto)
        nuevo.sig = this.cola.sig
        this.cola.sig = nuevo
        this.cola = nuevo
    }

    atender(){
        if(this.cola == this.cola.sig){
            return '#'
        }
        let q = this.cola.sig
        let r = q.sig
        let temp = r.info
        q.sig = r.sig
        if(q === q.sig){
            this.cola = q
        }
        return temp
    }

    vacia(){
        return (this.cola === this.cola.sig)
    }

    listar(){
        let q = this.cola.sig.sig
        while(q.info != "-1"){
            console.log(" ", q.info)
            q = q.sig
        }
    }

}