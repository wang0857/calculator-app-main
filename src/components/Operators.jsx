import '../scss/Operators.scss'

function Operators({operator, themeNumber, operatorHandler}) {
    
    function operatorExecute(e) {
        operatorHandler(e.target.textContent)
    }

    return (
        <button
            className={`calculator-key-operator theme-${themeNumber}`}
            operator={operator}
            onClick={operatorExecute}
        >
            {operator}
        </button>
    )
}

export default Operators