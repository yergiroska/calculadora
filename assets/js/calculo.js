
    let operRealiazada = document.getElementById("acumulado");
    let result = document.getElementById("resultado");
    let numero = "";
    let memoria = 0;
    let acumulado = "";
    let totalAcumulado = 0;
    let ultimoOperador = ''
    let x = 0;
    
    function getNumero(num) 
    {
        if (ultimoOperador === 'calcular') {
            limpiar();
        }

        if (ultimoOperador === 'memoria') {
            limpiar();
        }
    
        if (num === ',' && numero.includes(',')) {
            return;
        } 

        if (num === ',') {
            num = '.';
        }
    
        if (numero === '0' && num !== '.') {
            numero = num;
        } else {
            numero += num;
        }
    
        if (acumulado === '0' && num !== '.') {
            acumulado = num;
        } else {
            acumulado += num;
        }
        numero = numero.replace(/\./g, ',');
        operRealiazada.innerText = acumulado.replace(/\./g, ','); 
    }

   function getOperacion(op) 
   {
    
        let ultimoCaracter = acumulado.slice(-1)
        if(ultimoCaracter === op){
            return
        }

        if (['+', '-', 'x', '/'].includes(ultimoCaracter) && ultimoCaracter !== op) {
            acumulado = acumulado.slice(0, -1);
        }

        if (numero === '' && totalAcumulado === 0) { 
            return;
        }

        if (numero !== '') {
            if (totalAcumulado === 0) {
                totalAcumulado = parseFloat(numero.replace(/,/g, '.'));
            } else {
                let num = parseFloat(numero.replace(/,/g, '.'));
                switch (ultimoOperador) {
                    case '+':
                        totalAcumulado += num;
                        break;
                    case '-':
                        totalAcumulado -= num;
                        break;
                    case 'x':
                        totalAcumulado *= num;
                        break;
                    case '/':
                        totalAcumulado /= num;
                        break;
                    default:
                        totalAcumulado = num;
                }
            }            
        }        
        
        ultimoOperador = op;
        acumulado += op ;
        operRealiazada.innerText = acumulado.replace(/\./g, ',');
        numero = '';        
   }

    function calcular() 
    {
        if (numero === '' && totalAcumulado === 0) {
            return;
        } 

        let ultimoCaracter = acumulado.slice(-1);
        if (['+', '-', 'x', '/'].includes(ultimoCaracter)) {
            result.innerHTML = '<p class="mensaje";>Error: expresión inválida</p>';
            return;
        }

        if (ultimoOperador === '') {
            totalAcumulado = parseFloat(numero) || totalAcumulado;
        } else {

            let num = parseFloat(numero.replace(/,/g, '.'));
            switch (ultimoOperador) {
                case '+':
                    totalAcumulado += num;
                    break;
                case '-':
                    totalAcumulado -= num;
                    break;
                case 'x':
                    totalAcumulado *= num;
                    break;
                case '/':
                    if (num === 0) {
                        result.innerHTML = '<p class="mensaje";>No se puede dividir entre cero</p>';
                        return;
                    }
                    totalAcumulado /= num;
                    break;
                default:
                    totalAcumulado = num;
            }
        }

        let totalText = totalAcumulado.toFixed(2).replace('.', ',');
        operRealiazada.innerText = totalText + ' ';
        result.innerText = totalText;
        acumulado = totalText;
        numero = totalText;
        ultimoOperador = 'calcular';
    }


    function limpiar() 
    {
        acumulado = '';
        numero = '';
        ultimoOperador = '';
        totalAcumulado = 0;
        result.innerText = '0';
    }

    function limpiarAll() 
    {
        acumulado = '';
        numero = '';
        ultimoOperador = '';
        totalAcumulado = 0;
        result.innerText = '';
        operRealiazada.innerText = '';
    }

    function limpiarCE() 
    {       
        acumulado = acumulado.slice(0, -1) || '0';
        numero = numero.slice(0, -1);
        if (acumulado === '0' && numero === '') {
            limpiar()
            acumulado = '0';
        } else if (acumulado.length === 0) {
            acumulado = '0';
            
        }

        if(ultimoOperador === 'calcular'){
            limpiar();
        }

        operRealiazada.innerText = acumulado;
    }


    function recuperarMemoria() 
    { 
        numero = memoria.toString();
        acumulado += numero;
        operRealiazada.innerText = acumulado.replace('.', ',');
    }

    function guardarMemoria() 
    { 
        let ultimoNumero = "";
        for (let i = acumulado.length - 1; i >= 0; i--) {
            let x = acumulado[i].replace(/,/g, '.')
            if (isNaN(parseFloat(x)) && x !== '.') {
                if (ultimoNumero !== "") {
                    break;
                }
            } else {
                ultimoNumero = acumulado[i] + ultimoNumero;
            }
        }
        memoria = parseFloat(ultimoNumero.replace(/,/g, '.'));
        ultimoOperador = 'memoria';        
    }