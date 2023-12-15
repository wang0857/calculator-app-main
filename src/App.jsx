
import './scss/App.scss'

import { useState, useEffect } from 'react'

import Numbers from './components/Numbers'
import Operators from './components/Operators'
import Buttons from './components/Buttons'

function App() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const operators = ['+', '-', 'x', '/', '=', '.']
  const buttons = ['DEL', 'RESET']

  // Get user appearance for default dark mode setting
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

  const [themeNumber, setThemeNumber] = useState(window.matchMedia ? (isDarkMode ? 3 : 2) : 1)
  const [screenNumber, setScreenNumber] = useState('0')
  const [firstNumber, setFirstNumber] = useState(0)
  const [previousKeyType, setPreviousKeyType] = useState('')
  const [operatorSymbol, setOperatorSymbol] = useState('')

  function themeHandler(e) {
    document.body.className = `theme-${e.target.value}`

    setThemeNumber(e.target.value)
  }

  // Numbers buttons
  function numberHandler(number) {
    if (screenNumber === '0' || previousKeyType !== '') {
      setScreenNumber(number)
      setPreviousKeyType('')

      // Get the latest first number when continually calculating screen number befre hitting '='
      setFirstNumber(parseFloat(screenNumber.replace(/,/g, '')))
    } else {
      const result = document.querySelector('.calculator-result')
      // Remove ',' if there has already ',' on the screen
      const formattedNumber = result.textContent.replace(/,/g, '')

      setScreenNumber(formattedNumber + number)
    }

  }

  // Functions to be reapeated
  function processOperator(symbol) {
    setFirstNumber(parseFloat(screenNumber.replace(/,/g, '')))
    setPreviousKeyType('operator')
    setOperatorSymbol(symbol)
  }

  const calculateTotal = (n1, op, n2) => {
    // @Hack: Multiple each number by 100 and divide them by 100 after calculation to avoid the mess decimal digits
    // For example, 0.1 + 0.2 = 0.30000000000000004
    // Reason: The calculation of computer is binary, so it won't be exact 0.3

    switch (op) {
      case '+':
        return (n1 * 100 + n2 * 100) / 100

      case '-':
        return (n1 * 100 - n2 * 100) / 100

      case 'x':
        return (n1 * 100 * n2 * 100) / 10000

      case '/':
        return (n1 * 100 / n2 * 100) / 10000
    }
  }

  // Operators buttons
  function operatorHandler(operator) {
    // Get the latest second number when hitting operators
    const secondNumber = parseFloat(screenNumber.replace(/,/g, ''))

    switch (operator) {
      case '+':
        if (firstNumber !== 0 && operatorSymbol !== '' && previousKeyType !== 'operator') {
          setScreenNumber(calculateTotal(firstNumber, operatorSymbol, secondNumber).toString())
          setPreviousKeyType('operator')
          setOperatorSymbol('+')
        } else {
          processOperator('+')
        }
        break

      case '-':
        if (firstNumber !== 0 && operatorSymbol !== '' && previousKeyType !== 'operator') {
          setScreenNumber(calculateTotal(firstNumber, operatorSymbol, secondNumber).toString())
          setPreviousKeyType('operator')
          setOperatorSymbol('-')
        } else {
          processOperator('-')
        }
        break

      case 'x':
        if (firstNumber !== 0 && operatorSymbol !== '' && previousKeyType !== 'operator') {
          setScreenNumber(calculateTotal(firstNumber, operatorSymbol, secondNumber).toString())
          setPreviousKeyType('operator')
          setOperatorSymbol('x')
        } else {
          processOperator('x')
        }
        break

      case '/':
        if (firstNumber !== 0 && operatorSymbol !== '' && previousKeyType !== 'operator') {
          setScreenNumber(calculateTotal(firstNumber, operatorSymbol, secondNumber).toString())
          setPreviousKeyType('operator')
          setOperatorSymbol('/')
        } else {
          processOperator('/')
        }
        break

      // Calculation
      case '=':        
        setScreenNumber(calculateTotal(firstNumber, operatorSymbol, secondNumber).toString())
        setPreviousKeyType('')
        setOperatorSymbol('')
        break

      // Decimal
      case '.':
        if (screenNumber.includes('.')) {
          return
        } else {
          setScreenNumber(screenNumber + '.')
        }
        break
    }
  }

  // When hitting clean or reset buttons
  function buttonHandler(btn) {
    if (btn === 'RESET') {
      setScreenNumber('0')
    } else {
      if (screenNumber.length === 1) {
        setScreenNumber('0')
      } else {
        setScreenNumber(screenNumber.slice(0, screenNumber.length - 1))
      }
    }
  }


  return (
    <div className="app-container">
      <header>
        <h1>calc</h1>
        <div className="themeRange-container">
          <label className="themeRange-label" htmlFor="theme">THEME</label>
          <div className="themeRange-range-container">
            <div className="themeRange-range-options" id="themeType">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <input
              id="theme"
              type="range"
              min="1"
              max="3"
              defaultValue={window.matchMedia ? (isDarkMode ? 3 : 2) : 1}
              step="1"
              list="themeType"
              className={`themeRange-range-input theme-${themeNumber}`}
              onChange={themeHandler}
            />
          </div>
        </div>
      </header>
      <div className={`calculator-result theme-${themeNumber}`}>
        {/* Use RegExp to format the digits that are in front of decimal */}
        {
          screenNumber.includes('.') ?
          screenNumber.split('.')[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '.' + screenNumber.split('.')[1]:
          screenNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }
      </div>
      <div className={`calculator-keypad theme-${themeNumber}`}>
        {
          numbers.map(
            (number,index) =>
              <Numbers
                key={index}
                number={number}
                themeNumber={themeNumber}
                numberHandler={numberHandler}
              />
          )
        }
        {
          operators.map(
            (operator, index) =>
              <Operators
                key={index}
                operator={operator}
                themeNumber={themeNumber}
                operatorHandler={operatorHandler}
              />
          )
        }
        {
          buttons.map(
            (button, index) =>
              <Buttons
                key={index}
                label={button}
                themeNumber={themeNumber}
                buttonHandler={buttonHandler}
              />
          )
        }
      </div>
    </div>
  )
}

export default App
