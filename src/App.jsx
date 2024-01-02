import { useState } from'react';
import './App.css';

function App() {
  const [count, setCount] = useState('0');
  const [operations, setOperations] = useState('');

  const handleEraser = () => {setCount(count.slice(0, count.length - 1))}
  const handleClear = () => {setCount(0); setOperations('');}
  const handleClickDigit = (digit) => {
    console.log(count.length)
    if (count.length < 17) {
      if (count !== '0') {
        setCount(count.concat(digit));
      } else {
        setCount(digit.toString());
      }
    } 
  }

  return (
    <div id='calculator'>
      <div id='display-container'>
        <div id="operations">{...operations}</div>
        <div id="display">{count}</div>
      </div>
      <div id="keys">
        <button id='clear' className='clear' onClick={handleClear}>CE</button>
        <button id='backspace' className='operation' onClick={handleEraser}><i className="fa-solid fa-delete-left"></i></button>
        <button id='divide' className='operation'>/</button>
        <button id='seven' className='digit' onClick={() => handleClickDigit(7)}>7</button>
        <button id='eight' className='digit' onClick={() => handleClickDigit(8)}>8</button>
        <button id='nine' className='digit' onClick={() => handleClickDigit(9)}>9</button>
        <button id='multiply' className='operation'>X</button>
        <button id='four' className='digit' onClick={() => handleClickDigit(4)}>4</button>
        <button id='five' className='digit' onClick={() => handleClickDigit(5)}>5</button>
        <button id='six' className='digit' onClick={() => handleClickDigit(6)}>6</button>
        <button id='subtract' className='operation'>-</button>
        <button id='one' className='digit' onClick={() => handleClickDigit(1)}>1</button>
        <button id='two' className='digit' onClick={() => handleClickDigit(2)}>2</button>
        <button id='three' className='digit' onClick={() => handleClickDigit(3)}>3</button>
        <button id='add' className='operation'>+</button>
        <button id='zero' className='zero' onClick={() => handleClickDigit(0)}>0</button>
        <button id='decimal' className='digit'>.</button>
        <button id='equals' className='equals'>=</button>
      </div>
    </div>
  )
}

export default App
