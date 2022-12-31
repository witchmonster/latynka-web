function addSumbitTranslationEventOnClick(button, input, output, translator, unhideElements) {
    document.getElementById('submit').addEventListener('click', () => {
        var translatedText = translator(
            document.getElementById('input').value.length > 0
                ? document.getElementById('input').value
                : ''
        );
        document.getElementById('output').textContent = translatedText;
        if (translatedText) {
            unhideElements.forEach(element => {
                document.getElementById(element).classList.remove('hidden')
            });
        }
    })
}

export { addSumbitTranslationEventOnClick };

