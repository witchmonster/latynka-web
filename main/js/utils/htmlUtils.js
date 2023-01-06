function loadFile(path, callback) {
    var translatorHtml = ``;
    var include = new XMLHttpRequest();
    include.open('GET', path, true);
    include.onreadystatechange = function () {
        if (this.readyState !== 4)
            return `<ERROR readyState = ${this.readyState}>`;
        if (this.status !== 200)
            return `<ERROR status = ${this.status}>`;
        translatorHtml += this.responseText;
        return callback(translatorHtml);
    };
    include.send();
}

// <div>, <a>, <button> etc.
function replaceTextContent(element, value) {
    if (value) {
        document.getElementById(element).textContent = value;
    }
}

// <textarea>
function replaceTextValue(element, value) {
    if (value) {
        document.getElementById(element).value = value;
    }
}

export { loadFile, replaceTextContent, replaceTextValue }