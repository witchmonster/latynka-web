function addTestTextEventOnClick(button, output, text) {
    document.getElementById(button).addEventListener('click', () => {
        document.getElementById(output).value = text
    })
}

export { addTestTextEventOnClick };