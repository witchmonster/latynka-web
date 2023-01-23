import { addToggleThemeEvent } from './main/js/pageElements/theme.js';
import { addTestTextEventOnClick } from './main/js/pageElements/addTest.js';
import { getText } from './main/js/pageElements/texts.js';
import { addSumbitTranslationEventOnClick } from './main/js/pageElements/submitTranslation.js';
import { addResetEventOnClick } from './main/js/pageElements/reset.js';
import { addTextToElement } from './main/js/pageElements/addTextToElement.js';
import { addDevMode } from './main/js/pageElements/devMode.js';
import { klatinoid } from "./node_modules/@juliakramr/latynka/index.js"
import { addHtmlToElement } from './main/js/pageElements/addHtmlToElement.js';
import { addRunTestsOnClick } from "./test/js/pageElements/runTests.js";

window.onload = () => {

    addToggleThemeEvent();

    if (!isTest) {

        addTextToElement(input, initialInputText);

        addHtmlToElement(uvaga, getText(uvagaText))

        addDevMode();

        addResetEventOnClick(
            resetButton,
            input,
            output,
            resetText,
            toggleElements //hide elements
        );

        addTestTextEventOnClick(testText1Button, input, getText(test1Name));

        addSumbitTranslationEventOnClick(
            submitButton,
            input,
            output,
            klatinoid[translator],
            toggleElements //unhide elements
        );
    } else {
        addRunTestsOnClick(
            submitButton,
            statusElement,
            output,
            successOutput,
            failOutput,
            toggleElements //unhide elements
        );
    }
}