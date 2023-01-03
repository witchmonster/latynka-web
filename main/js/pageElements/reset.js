function addResetEventOnClick(button, input, output, resetInputText, hideElements) {
    document.getElementById(button).addEventListener('click', () => {
        document.getElementById(input).value = resetInputText
        document.getElementById(output).value = ''
        hideElements.forEach(element => {
            document.getElementById(element).classList.add('hidden')
        });
    })
}

export { addResetEventOnClick };

