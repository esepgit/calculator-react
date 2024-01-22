import { useState } from'react';
import './App.css';

function App() {
  const [count, setCount] = useState('0');
  const [auxNumber, setAuxNumber] = useState('0');

  const handleEraser = () => {setCount(count.slice(0, count.length - 1))}
  const handleClear = () => {setCount('0')}

  const handleClickDigit = (digit) => {
    if (count === '0') {
      setCount(digit)
      setAuxNumber(digit)
    } else {
      setCount(count.toString() + digit)
      setAuxNumber(auxNumber.concat(digit))
    }
  }

  const handleClickOperation = (op) => {
    if (!count.includes('X') && !count.includes('+') && !count.includes('-') && !count.includes('/'))
    setCount(count.toString() + op)
    setAuxNumber('')
  }

  const handleClickTotal = () => {
    if (count.includes('+') || count.includes('-') || count.includes('/') || count.includes('X')) {
      if (/.+[+\-X/].+/g.test(count)) {
        const first = parseFloat(
          count.slice(0, count.indexOf(count.match(/[+\-X/]/)))
        ).toFixed(4);
        const second = parseFloat(
          count.slice(count.indexOf(count.match(/[+\-X/]/)) + 1)
        ).toFixed(4);
        const operation = count.match(/[+\-X/]/);

        if (operation == "+") {
          setCount(String(Number(first) + Number(second)));
        } else if (operation == "-") {
          setCount(String(Number(first) - Number(second)));
        } else if (operation == "X") {
          setCount(String(Number(first) * Number(second)));
        } else if (operation == '/') {
          setCount(String(Number(first) / Number(second)));
        } else {
          console.log(operation)
        }
      }
    }
    
    setAuxNumber('0')
  }

  const handleClickDecimal = () => {
    if (!auxNumber.includes('.')) {
      setCount(count.concat('.'))
      setAuxNumber(auxNumber.concat('.'))
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
