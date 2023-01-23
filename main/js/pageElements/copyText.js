function copyText() {
    var text = document.getElementById("output");

    // text.select();
    // text.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(text.textContent);

    console.log("Copied the text: " + text.textContent);
}