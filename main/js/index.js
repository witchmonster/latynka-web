import { addToggleThemeEvent } from './elements/theme.js';
import { addTestTextEventOnClick } from '../../test/js/addTest.js';
import { testText } from '../../test/js/testcases/test_texts.js';
import { addSumbitTranslationEventOnClick } from './elements/submitTranslation.js';
import { addResetEventOnClick } from './elements/reset.js';
import { addInputText } from './elements/inputText.js';
import { addDevMode } from './elements/devMode.js';
import { translatorMap } from './converters/translators.js';

window.onload = () => {

    addInputText(input, initialInputText);

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
        submitTranslationButton,
        input,
        output,
        translatorMap[translator],
        toggleElements //unhide elements
    );
}