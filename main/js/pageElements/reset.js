function addResetEventOnClick(button, input, output, resetInputText, initialInputText, hideElements) {
    doHide(input, output, initialInputText, hideElements);
    document.getElementById(button).addEventListener('click', () => {
        doHide(input, output, resetInputText, hideElements);
    })

    function doHide(input, output, resetInputText, hideElements) {
        document.getElementById(input).value = resetInputText
        document.getElementById(output).value = ''
        hideElements.forEach(element => {
            document.getElementById(element).classList.add('hidden')
        });
    }
}

export { addResetEventOnClick };

