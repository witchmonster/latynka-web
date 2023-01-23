function addTextToElement(element, text) {
    document.getElementById(element).value = text
    document.getElementById(element).textContent = text
}

export { addTextToElement };
