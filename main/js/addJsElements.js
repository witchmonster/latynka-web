import { addToggleThemeEvent } from './pageElements/theme.js';
import { addTestTextEventOnClick } from './pageElements/addTest.js';
import { testText } from '../../test/js/testcases/testTexts.js';
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

    addTestTextEventOnClick(testText1Button, input, testText(test1Name));

    addSumbitTranslationEventOnClick(
        submitButton,
        input,
        output,
        converterMap[translator],
        toggleElements //unhide elements
    );
}