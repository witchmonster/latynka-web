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

const common = {
    from: 'from',
    to: 'to',
    resetText: '',
    toggleElements: ['output', 'copy'],
    input: 'input',
    output: 'output',
    uvaga: 'uvaga',
    submitButton: 'submit',
    resetButton: 'reset',
    testText1Button: 'submitTestText1',
    isTest: false
}

const latToCyr = {
    fromText: 'Latynka',
    toText: 'Кирилиця',

    //translator type
    translator: 'latToCyr',

    //UI text elements
    initialInputText: 'Vvedit\' tekst latynkoju',

    //elements
    test1Name: 'latToCyrTest1',
    uvagaText: 'latToCyrUvaga',
}

const cytToLat = {
    fromText: 'Кирилиця',
    toText: 'Latynka',

    //translator type
    translator: 'cyrToLat',

    //UI text elements
    initialInputText: 'Введіть текст кирилицею',

    //elements
    test1Name: 'cyrToLatTest1',
    uvagaText: 'cyrToLatUvaga',
}

var variables = {
    ...common,
    ...cytToLat
}

var current = 'cytToLat';

var switchFrom = {
    'cytToLat': latToCyr,
    'latToCyr': cytToLat
}

var switchCurrent = {
    'cytToLat': 'latToCyr',
    'latToCyr': 'cytToLat'
}

window.switchConverter = function () {
    var switched = switchFrom[current];
    current = switchCurrent[current];
    variables = {
        ...common,
        ...switched
    }

    loadElements(variables);
}

window.onload = () => {
    addToggleThemeEvent();

    if (isTest) {
        variables.isTest = isTest;
    }

    loadElements(variables);
}

function loadElements(arg) {
    if (!arg.isTest) {

        addTextToElement(arg.input, arg.initialInputText);
        addTextToElement(arg.from, arg.fromText);
        addTextToElement(arg.to, arg.toText);

        addHtmlToElement(arg.uvaga, getText(arg.uvagaText))

        addDevMode();

        addResetEventOnClick(
            arg.resetButton,
            arg.input,
            arg.output,
            arg.resetText,
            arg.initialInputText,
            arg.toggleElements //hide elements
        );

        addTestTextEventOnClick(arg.testText1Button, arg.input, getText(arg.test1Name));

        addSumbitTranslationEventOnClick(
            arg.submitButton,
            arg.input,
            arg.output,
            klatinoid[arg.translator],
            arg.toggleElements //unhide elements
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