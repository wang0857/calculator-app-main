import '../scss/Numbers.scss'

function Numbers({number, themeNumber, numberHandler}) {

    function displayNumber(e) {
        numberHandler(e.target.textContent)
    }

    return(
        <button
            className={`calculator-key-number theme-${themeNumber}`}
            number={number}
            onClick={displayNumber}
        >
            {number}
        </button>
    )
}

export default Numbers