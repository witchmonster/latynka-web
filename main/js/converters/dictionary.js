var russiaDetected = '>>>>>>>>> RUSSIA IS A TERRORIST STATE!!! <<<<<<<<<';

//cyrillic to latin

var digraphs = {
    //ё
    'йо': 'jo',
    'ьо': 'jo'
};

var translatesToDigraph = {
    'є': 'je',
    'ї': 'ji',
    'щ': 'šč',
    'ю': 'ju',
    'я': 'ja',
    'Є': 'Je',
    'Ї': 'Ji',
    'Щ': 'Šč',
    'Ю': 'Ju',
    'Я': 'Ja'
};

var translatesToUpperCaseDigraph = {
    'Є': 'JE',
    'Ї': 'JI',
    'Щ': 'ŠČ',
    'Ю': 'JU',
    'Я': 'JA'
};

var lowerCase = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'ґ': 'ĝ',
    'д': 'd',
    'е': 'e',
    'ж': 'ž',
    'з': 'z',
    'и': 'y',
    'і': 'i',
    'й': 'j',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'c',
    'ч': 'č',
    'ш': 'š',
    'є': 'je',
    'ї': 'ji',
    'щ': 'šč',
    'ю': 'ju',
    'я': 'ja',
};

var upperCase = {
    'А': 'A',
    'Б': 'B',
    'В': 'V',
    'Г': 'G',
    'Ґ': 'Ĝ',
    'Д': 'D',
    'Е': 'E',
    'Ж': 'Ž',
    'З': 'Z',
    'И': 'Y',
    'І': 'I',
    'Й': 'J',
    'К': 'K',
    'Л': 'L',
    'М': 'M',
    'Н': 'N',
    'О': 'O',
    'П': 'P',
    'Р': 'R',
    'С': 'S',
    'Т': 'T',
    'У': 'U',
    'Ф': 'F',
    'Х': 'H',
    'Ц': 'C',
    'Ч': 'Č',
    'Ш': 'Š',
    'Є': 'Je',
    'Ї': 'Ji',
    'Щ': 'Šč',
    'Ю': 'Ju',
    'Я': 'Ja'
};

var special = {
    'Ь': '\'',
    'ь': '\'',
    '\'': '’'
};

var russianAlert = {
    'ё': russiaDetected,
    'Ё': russiaDetected,
    'э': russiaDetected,
    'Э': russiaDetected,
    'ы': russiaDetected,
    'Ы': russiaDetected,
    'ъ': russiaDetected,
    'Ъ': russiaDetected
};

var singleLetters = {
    ...lowerCase,
    ...upperCase,
    ...translatesToDigraph,
    ...special,
    ...russianAlert
}

var cyrToLat = {
    //by size
    singleLetters,
    digraphs,
    //by type
    lowerCase,
    upperCase,
    translatesToDigraph,
    translatesToUpperCaseDigraph,
    special,
    //detect russian letters
    russianAlert,
    //match all
    all: {
        singleLetters,
        digraphs
    }
}

var dictionary = {
    cyrToLat
}

export { dictionary };