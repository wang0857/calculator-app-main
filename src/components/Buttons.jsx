import '../scss/Buttons.scss'

function Buttons({label, themeNumber, buttonHandler}) {

    function buttonHandling(e) {
        buttonHandler(e.target.textContent)
    }

    return (
        <button
            className={`calculator-key-button theme-${themeNumber}`}
            label={label}
            onClick={buttonHandling}
        >
            {label}
        </button>
    )
}

export default Buttons