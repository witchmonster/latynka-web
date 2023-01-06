import { loadFile, replaceTextContent, replaceTextValue } from "../utils/htmlUtils.js";
import { latToCyr } from "../converters/latToCyr.js";
import { testText } from "../../../test/js/testcases/testTexts.js";

const pathToTranslator = 'html/translator.html';

function scripts(doc, def) {
    return [
        function addTextToElements() {
            replaceTextContent(title, textElementValues[title]);
            replaceTextContent(buttonSubmitTestText1, textElementValues[buttonSubmitTestText1]);
            replaceTextContent(buttonReset, textElementValues[buttonReset]);
            replaceTextContent(buttonSubmit, textElementValues[buttonSubmit]);
            replaceTextValue(formInput, textElementValues[formInput]);
        },
        function addTestTextEventOnClick() {
            document.getElementById(buttonSubmitTestText1).addEventListener('click', () => {
                document.getElementById(formInput).value = testText(test1Name)
            })
        },
        function addResetEventOnClick() {
            document.getElementById(buttonReset).addEventListener('click', () => {
                document.getElementById(formInput).value = ''
                document.getElementById(formOutput).value = ''
                hideElements.forEach(element => {
                    document.getElementById(element).classList.add('hidden')
                });
            })
        },
        function addSumbitTranslationEventOnClick() {
            document.getElementById(buttonSubmit).addEventListener('click', () => {
                var translatedText = latToCyr(document.getElementById(formInput).value.length > 0
                    ? document.getElementById(formInput).value
                    : '');
                document.getElementById(formOutput).textContent = translatedText;
                if (translatedText) {
                    hideElements.forEach(element => {
                        document.getElementById(element).classList.remove('hidden')
                    });
                }
            })
        },
        function addDevMode() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const isDevMode = urlParams.get(devMode) != null
            console.log("DevMode enabled: " + isDevMode);
            if (isDevMode) {
                let devModeElements = document.getElementsByClassName(devMode);
                if (devModeElements.length != 0) {
                    Array.prototype.slice.call(devModeElements).forEach(element => {
                        element.classList.remove('hidden')
                    });
                }
            }
        }
    ]
}

class Translator extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        loadFile(pathToTranslator, (translatorHtml) => {
            this.innerHTML = translatorHtml;
        });
    }
}

customElements.define('translator-component', Translator);

Translator.scripts = scripts;

export { Translator }
