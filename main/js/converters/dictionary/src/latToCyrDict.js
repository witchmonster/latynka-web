var digits = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
};

var lowerCase = {
    'a': 'а',
    'b': 'б',
    'v': 'в',
    'g': 'г',
    'ĝ': 'ґ',
    'd': 'д',
    'e': 'е',
    'ž': 'ж',
    'z': 'з',
    'y': 'и',
    'i': 'і',
    'j': 'й',
    'k': 'к',
    'l': 'л',
    'm': 'м',
    'n': 'н',
    'o': 'о',
    'p': 'п',
    'r': 'р',
    's': 'с',
    't': 'т',
    'u': 'у',
    'f': 'ф',
    'h': 'х',
    'c': 'ц',
    'č': 'ч',
    'š': 'ш'
};

var upperCase = {
    'A': 'А',
    'B': 'Б',
    'V': 'В',
    'G': 'Г',
    'Ĝ': 'Ґ',
    'D': 'Д',
    'E': 'Е',
    'Ž': 'Ж',
    'Z': 'З',
    'Y': 'И',
    'I': 'І',
    'J': 'Й',
    'K': 'К',
    'L': 'Л',
    'M': 'М',
    'N': 'Н',
    'O': 'О',
    'P': 'П',
    'R': 'Р',
    'S': 'С',
    'T': 'Т',
    'U': 'У',
    'F': 'Ф',
    'H': 'Х',
    'C': 'Ц',
    'Č': 'Ч',
    'Š': 'Ш'
};

var joDigraph = {
    'jo': 'йо',
    'Jo': 'Йо',
    'JO': 'ЙО',
    'jO': 'йО',
    //'jo': 'ьо',
};

var ioDigraph = {
    'jo': 'ьо',
    'Jo': 'Ьо',
    'JO': 'ЬО',
    'jO': 'ьО',
    //'jo': 'ьо',
};

var apostrophe = {
    '’ja': '\’я',
    '’JA': '\’я',
    '’Ja': '\’Я',
    '’jA': '\’Я',
    '’ji': '\’ї',
    '’JI': '\’ї',
    '’Ji': '\’Ї',
    '’jI': '\’Ї',
    '’je': '\’є',
    '’JE': '\’є',
    '’Je': '\’Є',
    '’jE': '\’Є',
    '’ju': '\’ю',
    '’JU': '\’ю',
    '’Ju': '\’Ю',
    '’jU': '\’Ю',
    '’jo': 'йо',
    '’JO': 'ЙО',
    '’Jo': 'ЙО',
    '’jO': 'ЙО',
    '\'ja': '\’я',
    '\'JA': '\’я',
    '\'Ja': '\’Я',
    '\'jA': '\’Я',
    '\'ji': '\’ї',
    '\'JI': '\’ї',
    '\'Ji': '\’Ї',
    '\'jI': '\’Ї',
    '\'je': '\’є',
    '\'JE': '\’є',
    '\'Je': '\’Є',
    '\'jE': '\’Є',
    '\'ju': '\’ю',
    '\'JU': '\’ю',
    '\'Ju': '\’Ю',
    '\'jU': '\’Ю',
    '\'jo': 'йо',
    '\'JO': 'ЙО',
    '\'Jo': 'ЙО',
    '\'jO': 'ЙО',
}

var digraphs = {
    ...joDigraph,
    'je': 'є',
    'Je': 'Є',
    'JE': 'Є',
    'jE': 'Є',
    'ji': 'ї',
    'Ji': 'Ї',
    'JI': 'Ї',
    'jI': 'Ї',
    'šč': 'щ',
    'Šč': 'Щ',
    'ŠČ': 'Щ',
    'šČ': 'Щ',
    'ju': 'ю',
    'Ju': 'Ю',
    'JU': 'Ю',
    'jU': 'Ю',
    'ja': 'я',
    'Ja': 'Я',
    'JA': 'Я',
    'jA': 'Я'
};

var special = {
    ' ': ' ',
    '’': '\'',
    '’': '\'',
    '’': '\'',
    '’': '\'',
    '’': '\'',
    '@': '@',
    '"': '"'
};

var lowerCaseMjakyjZnak = {
    '\'': 'ь',
    '’': 'ь'
};

var upperCaseMjakyjZnak = {
    '\'': 'Ь',
    '’': 'Ь'
};

var mjakyjZnak = {
    ...lowerCaseMjakyjZnak
};

var lowerCaseVowels = {
    'a': 'а',
    'e': 'е',
    'y': 'и',
    'i': 'і',
    'o': 'о',
    'u': 'у'
};

var upperCaseVowels = {
    'A': 'А',
    'E': 'Е',
    'Y': 'И',
    'I': 'І',
    'O': 'О',
    'U': 'У'
};

var vowels = {
    ...lowerCaseVowels,
    ...upperCaseVowels
}

var delimiters = {
    ' ': ' ',
    '.': '.',
    ',': ',',
    ';': ';',
    '\'': '\'',
    '\"': '\"',
    '\«': '\«',
    '\“': '\“',
    '\\': '\\',
    '\/': '\/',
    '\|': '\|',
    '(': '(',
    ')': ')',
    '[': '[',
    ']': ']',
    '!': '!',
    '@': '@',
    '#': '#',
    '$': '$',
    '*': '*',
    '-': '-',
    '=': '=',
    '+': '+',
    '_': '_',
    '~': '~',
    '`': '`',
    '\t': '\t',
    '\r': '\r',
    '\n': '\n'
};

const matchingSingleLetters = {
    ...digits,
    ...lowerCase,
    ...upperCase,
    ...special,
    ...mjakyjZnak
}

const singleLetters = {
    ...lowerCase,
    ...upperCase,
    ...special,
    ...mjakyjZnak
}

const latToCyrDict = {
    //by size
    singleLetters,
    digraphs,
    apostrophe,
    //by type
    digits,
    vowels,
    lowerCase,
    upperCase,
    mjakyjZnak,
    lowerCaseMjakyjZnak,
    upperCaseMjakyjZnak,
    special,
    delimiters,
    joDigraph,
    ioDigraph,
    matchingSingleLetters,
    //match all
    all: {
        singleLetters,
        digraphs,
        apostrophe
    }
}

export { latToCyrDict };