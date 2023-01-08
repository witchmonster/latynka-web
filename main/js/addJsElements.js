import { addToggleThemeEvent } from './pageElements/theme.js';
import { addTestTextEventOnClick } from './pageElements/addTest.js';
import { getText } from './pageElements/texts.js';
import { addSumbitTranslationEventOnClick } from './pageElements/submitTranslation.js';
import { addResetEventOnClick } from './pageElements/reset.js';
import { addTextToElement } from './pageElements/addTextToElement.js';
import { addDevMode } from './pageElements/devMode.js';
import { converterMap } from './converters/converters.js';
import { addHtmlToElement } from './pageElements/addHtmlToElement.js';

window.onload = () => {

    addTextToElement(input, initialInputText);

    addHtmlToElement(uvaga, getText(uvagaText))

    addDevMode();

    addToggleThemeEvent();

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
        converterMap[translator],
        toggleElements //unhide elements
    );
}