import { Header } from "./pageElements/header.js";
import { Translator } from "./pageElements/translator.js";
import { Footer } from "./pageElements/footer.js";
import { locales, textElements, l10n } from "./l10n/l10n.js";

const locale = locales.uk_CR;

const title = 'title';
const devMode = 'devMode';
const changeTheme = 'change_theme';
const sliderTheme = 'slider_theme';
const buttonSubmitTestText1 = 'button_submitTestText1';
const test1Name = 'latin1';
const buttonReset = 'button_reset';
const buttonSubmit = 'button_submit';
const formInput = 'form_input';
const formOutput = 'form_output';
const arrow = 'arrow';
const linkToReverse = 'link_reverse';

const linkToReverseRef = 'index.html';

const customDef = {
    title,
    devMode,
    changeTheme,
    sliderTheme,
    buttonSubmitTestText1,
    test1Name,
    buttonReset,
    buttonSubmit,
    formInput,
    formOutput,
    arrow,
    linkToReverse,
    linkToReverseRef,

    hideElements: [formOutput, arrow],

    textElementValues: {
        'title': l10n(locale, textElements.latToCyrName),
        'changeTheme': l10n(locale, textElements.changeTheme),
        'button_submitTestText1': l10n(locale, textElements.fillTestText1),
        'button_reset': l10n(locale, textElements.buttonReset),
        'button_submit': l10n(locale, textElements.convert),
        'form_input': l10n(locale, textElements.initialInputText),
        'link_reverse': l10n(locale, textElements.cyrToLatName)
    }
}

function scripts(doc) {
    return [
        ...Header.scripts(doc, customDef),
        ...Translator.scripts(doc, customDef),
        ...Footer.scripts(doc, customDef)
    ]
}

function loadScripts(doc) {
    for (let i = 0; i < scripts.length; i++) {
        scripts(doc)[i]();
    }
}

window.onload = () => {
    loadScripts(document);
}