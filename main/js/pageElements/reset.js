function addResetEventOnClick(button, input, output, initialInputText, hideElements) {
    doHide(input, output, initialInputText, hideElements);
    document.getElementById(button).addEventListener('click', () => {
        doHide(input, output, initialInputText, hideElements);
    })

    function doHide(input, output, initialInputText, hideElements) {
        document.getElementById(input).placeholder = initialInputText
        document.getElementById(input).value = ''
        document.getElementById(output).value = ''
        hideElements.forEach(element => {
            document.getElementById(element).classList.add('hidden')
        });
    }
}

export { addResetEventOnClick };

