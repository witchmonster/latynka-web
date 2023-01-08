import { addToggleThemeEvent } from './pageElements/theme.js';
import { addTestTextEventOnClick } from './pageElements/addTest.js';
import { getTestText } from '../../test/js/testcases/testText.js';
import { addSumbitTranslationEventOnClick } from './pageElements/submitTranslation.js';
import { addResetEventOnClick } from './pageElements/reset.js';
import { addTextToElement } from './pageElements/addTextToElement.js';
import { addDevMode } from './pageElements/devMode.js';
import { converterMap } from './converters/converters.js';

window.onload = () => {

    addTextToElement(input, initialInputText);

    addDevMode();

    addToggleThemeEvent();

    addResetEventOnClick(
        resetButton,
        input,
        output,
        resetText,
        toggleElements //hide elements
    );

    addTestTextEventOnClick(testText1Button, input, getTestText(test1Name));

    addSumbitTranslationEventOnClick(
        submitButton,
        input,
        output,
        converterMap[translator],
        toggleElements //unhide elements
    );
}