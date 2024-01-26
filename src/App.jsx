import { useState } from'react';
import './App.css';

function App() {
  const [count, setCount] = useState('0');
  const [auxNumber, setAuxNumber] = useState('0');

  const handleEraser = () => {setCount(count.slice(0, count.length - 1))}
  const handleClear = () => {setCount('0')}

  const handleClickDigit = (digit) => {
    if (count.length < 20) {
      if (count === "0") {
        setCount(digit);
        setAuxNumber(digit);
      } else {
        setCount(count.toString() + digit);
        setAuxNumber(auxNumber.concat(digit));
      }
    } 
  }

  const handleClickOperation = (op) => {
    //si no incluye un operador, concatenar el operador
    if (!count.includes('X') && !count.includes('+') && !/(?<=.)-/g.test(count) && !count.includes('/') && count != 0) {
    setCount(count.toString() + op)
    setAuxNumber('')
    //sí incluye un operador
  } else {
    const last = count[count.length - 1];
    const secondLast = count[count.length -2];
    //incluye sólo 1 operador al último y op no es -
      if (
        (last == "+" ||
        last == "-" ||
        last == "X" ||
        last == "/") &&
        (secondLast != "+" &&
        secondLast != "-" &&
        secondLast != "X" &&
        secondLast != "/") &&
        op != '-'
      ) {
        //reemplaza el último operador por op, excepto para -
        setCount(count.slice(0, count.length - 1) + op);
        //incluye un operador en seconLast, pero estoy pulsando -
      } else if (op == '-' && secondLast != '+' && secondLast != '-' && secondLast != 'X' && secondLast != '/' && last != 0 ){
        //escribe un - despues de un operador
        setCount(count + op)
        //incluye un operador y last es -
       } else if (
         last == '-' &&
         (secondLast == "+" ||
         secondLast == "-" ||
         secondLast == "X" ||
         secondLast == "/")
       ) {
        console.log("acu");
        //reemplaza los dos últimos operadores por op
          setCount(count.slice(0, count.length - 2) + op);
       } else {
        let result = handleClickTotal();
        console.log('here',result);
        setCount(result + op)
       }
      //else {
      //   //el último operador es - y hay otro operador al lado
    
      //       //reemplaza el último operador
      //       setCount(count.slice(0, count.length - 1) + op);
        
      // } {
      //   //para que arroje resultado si tengo n+x y se presiona otro operador
      //   handleClickTotal();
      // }
  }
}

  const handleClickTotal = () => {
    let result = "";
    if (count.includes('+') || count.includes('-') || count.includes('/') || count.includes('X')) {
      if (/.+[+\-X/].+/g.test(count)) {
        const first = parseFloat(
          count.slice(0, count.indexOf(count.match(/(?<=\d)[+\-X/]/g)))
        ).toFixed(4);
        const second = parseFloat(
          count.slice(count.indexOf(count.match(/(?<=\d)[+\-X/]/g)) + 1)
        ).toFixed(4);

        //busca + or - or X or / que tenga algun caracter delante (solo coincide + en -n+m)
        const operation = count.match(/(?<=\d)[+\-X/]/g);

        
        if (operation == "+") {
          result = String(Number(first) + Number(second));
          console.log('first',first)
          setCount(result);
        } else if (operation == "-") {
          console.log('second',Number(second))
          result = String(Number(first) - Number(second));
          console.log('res', first - second)
          setCount(result);
        } else if (operation == "X") {
          result = String(Number(first) * Number(second));
          console.log('X second', second)
          setCount(result);
        } else if (operation == '/') {
          result = String(Number(first) / Number(second));
          setCount(result);
        } else {
          console.log('op',operation)
        }
      }
    }
    
    setAuxNumber(count)
    return result;
  }

  const handleClickDecimal = () => {
    if (
      !auxNumber.includes(".") &&
      count[count.length - 1] !== "+" &&
      count[count.length - 1] !== "-" &&
      count[count.length - 1] !== "X" &&
      count[count.length - 1] !== "/"
    ) {
      setCount(count.concat("."));
      setAuxNumber(auxNumber.concat("."));
    }
  }

  return (
    <div id='calculator'>
      <div id='display-container'>
        <div id="display">{count}</div>
      </div>
      <div id="keys">
        <button id='clear' className='clear' onClick={handleClear}>CE</button>
        <button id='backspace' className='operation' onClick={handleEraser}><i className="fa-solid fa-delete-left"></i></button>
        <button id='divide' className='operation' onClick={() => handleClickOperation('/')}>/</button>
        <button id='seven' className='digit' onClick={() => handleClickDigit('7')}>7</button>
        <button id='eight' className='digit' onClick={() => handleClickDigit('8')}>8</button>
        <button id='nine' className='digit' onClick={() => handleClickDigit('9')}>9</button>
        <button id='multiply' className='operation' onClick={() => handleClickOperation('X')}>X</button>
        <button id='four' className='digit' onClick={() => handleClickDigit('4')}>4</button>
        <button id='five' className='digit' onClick={() => handleClickDigit('5')}>5</button>
        <button id='six' className='digit' onClick={() => handleClickDigit('6')}>6</button>
        <button id='subtract' className='operation' onClick={() => handleClickOperation('-')}>-</button>
        <button id='one' className='digit' onClick={() => handleClickDigit('1')}>1</button>
        <button id='two' className='digit' onClick={() => handleClickDigit('2')}>2</button>
        <button id='three' className='digit' onClick={() => handleClickDigit('3')}>3</button>
        <button id='add' className='operation' onClick={() => handleClickOperation('+')}>+</button>
        <button id='zero' className='zero' onClick={() => handleClickDigit('0')}>0</button>
        <button id='decimal' className='digit' onClick={handleClickDecimal}>.</button>
        <button id='equals' className='equals' onClick={handleClickTotal}>=</button>
      </div>
    </div>
  )
}

export default App
