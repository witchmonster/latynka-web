const locales = {
    en_US: 'en_US',
    uk_CR: 'uk_CR',
    uk_LT: 'uk_LT'
}

const textElements = {
    cyrToLatName: 'cyrToLatName',
    latToCyrName: 'latToCyrName',
    changeTheme: 'changeTheme',
    fillTestText1: 'fillTestText1',
    initialInputText: 'initialInputText',
    buttonReset: 'buttonReset',
    convert: 'convert'
}

const l10nDictionary = {
    en_US: {
        cyrToLatName: 'Cyrillic ➡ Latin',
        latToCyrName: 'Latin ➡ Cyrillic (EXPERIMENTAL)',
        fillTestText1: 'Fill test text',
        initialInputText: 'Input text in cyrrilic script',
        changeTheme: 'Change Theme',
        buttonReset: 'Clear text field',
        convert: 'Convert'
    },
    uk_CR: {
        cyrToLatName: `Кирилиця ➡ Латинка`,
        latToCyrName: 'Латинка ➡ Кирилиця (ЕКСПЕРИМЕНТАЛЬНА ВЕРСІЯ)',
        fillTestText1: `Заповнити тестовий текст`,
        initialInputText: `Введіть текст кирилицею`,
        changeTheme: `Змінити тему`,
        buttonReset: `Очистити текстове поле`,
        convert: `Замінити`
    },
    uk_LT: {
        cyrToLatName: `Kyrylycja ➡ Latynka`,
        latToCyrName: 'Latynka ➡ Kyrylycja (EXPERIMENTAL)',
        fillTestText1: `Zapovnyty testovyj tekst`,
        initialInputText: `Vvedit' tekst kyrylyceju`,
        changeTheme: `Zminyty temu`,
        buttonReset: `Očystyty tekstove pole`,
        convert: `Zaminyty`
    }
}

function l10n(locale, value) {
    //fallback to English
    if (!l10nDictionary[locale][value]) {
        return l10nDictionary[locales.en_US][value];
    }
    return l10nDictionary[locale][value];
}

export { locales, l10n, textElements };