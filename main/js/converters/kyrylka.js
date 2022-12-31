function kyrylka(text) {
  var answer = '';
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
    //'jo': 'ьо',
  };

  var apostrof = {
    '’ja': '’я',
    '’ji': '’ї',
    '’je': '’є',
    '’ju': '’ю',
    '\'ja': '’я',
    '\'ji': '’ї',
    '\'je': '’є',
    '\'ju': '’ю'
  }

  var digraphs = {
    ...joDigraph,
    'je': 'є',
    'ji': 'ї',
    'šč': 'щ',
    'ju': 'ю',
    'ja': 'я',
    'Je': 'Є',
    'JE': 'Є',
    'Ji': 'Ї',
    'JI': 'Ї',
    'Šč': 'Щ',
    'ŠČ': 'Щ',
    'Ju': 'Ю',
    'JU': 'Ю',
    'Ja': 'Я',
    'JA': 'Я'
  };

  var special = {
    '’': '’',
    '\'': 'ь'
    //'\'': 'Ь'
  };

  var russiaDetected = '>>>>>>>>> RUSSIA IS A TERRORIST STATE!!!! <<<<<<<<<';

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

  var converter = {
    ...lowerCase,
    ...upperCase,
    ...digraphs,
    ...special,
    ...russianAlert
  };

  var exceptions3 = {
    'Rjo': 'Рьо',
  };

  var exceptions4 = {
  };

  var exceptions5 = {
    'ad\'je': 'адьє',
    'trjoh': 'трьох',
  };

  var exceptions6 = {
    'Got\'je': 'Готьє',
    'N\'jasa': 'Ньяса',
    'Ren\'je': 'Реньє'
  };

  var exceptions7 = {
    'atel\'je': 'ательє',
    'N\'juton': 'Ньютон'
  };

  var exceptions8 = {
    'pas\'jans': 'пасьянс',
    'čotyrjoh': 'чотирьох',
    'mil\'jard': 'мільярд'
  };

  var exceptions9 = {
    'barel\'jef': 'барельєф',
    'vin\'jetka': 'віньєтка',
    'N\'ju-Jork': 'Нью-Йорк'
  };

  var exceptions10 = {
    'monpans\'je': 'монпансьє',
    'V’jent\'jan': 'В’єнтьян',
    'V\'jent\'jan': 'В’єнтьян',
  };

  var exceptions11 = {
    'buton\'jerka': 'бутоньєрка'
  };

  var exceptions12 = {
    'konferans\'je': 'конферансьє',
  };

  var maxExceptionWordSize = 12;

  var exceptions = {
    3: exceptions3,
    4: exceptions4,
    5: exceptions5,
    6: exceptions6,
    7: exceptions7,
    8: exceptions8,
    9: exceptions9,
    10: exceptions10,
    11: exceptions11,
    12: exceptions12
  }

  var i = 0;

  //todo add case insensitive match
  function matchSubstring(i, size, dict) {
    return i + size - 1 < text.length && dict[text.substring(i, i + size)];
  }

  while (i < text.length) {
    if (!converter[text[i]]) {
      answer += text[i];
      i++;
    } else {

      //process exceptions
      var j = maxExceptionWordSize - 1;
      while (j > 1) {
        while (matchSubstring(i, j + 1, exceptions[j + 1])) {
          answer += exceptions[j + 1][text.substring(i, i + j + 1)];
          i += j + 1;
        }
        j--;
      }

      //process apostrophes
      while (matchSubstring(i, 3, apostrof)) {
        answer += apostrof[text.substring(i, i + 3)];
        i += 3;
      }

      //process jo
      if (matchSubstring(i, 2, joDigraph)) {
        if (shouldBeJo(text, i)) {
          answer += joDigraph[text.substring(i, i + 2)];
          i += 2;
        } else {
          answer += 'ьо';
          i += 2;
        }
      }

      //process digraphs
      while (matchSubstring(i, 2, digraphs)) {
        answer += digraphs[text.substring(i, i + 2)];
        i += 2;
      }

      //process single characters
      if (i < text.length && converter[text[i]]) {
        answer += converter[text[i]];
        i++;
      }
    }
  }
  return answer;
}

function shouldBeJo(text, i) {
  var isMjakyjZnak = {
    '\'': true
  };
  var isVowel = {
    'a': true,
    'e': true,
    'i': true,
    'o': true,
    'u': true
  };
  var isAlwaysHardConsonant = {
    'b': true,
    'p': true,
    'v': true,
    'm': true,
    'f': true,
    'r': true,
    'ž': true,
    'č': true,
    'š': true
  };
  var isDelimiter = {
    ' ': true,
    '.': true,
    ',': true,
    ';': true,
    '/': true,
    '\\': true,
    '(': true,
    ')': true,
    '[': true,
    ']': true,
    '!': true,
    '@': true,
    '#': true,
    '$': true,
    '*': true,
    '-': true,
    '=': true,
    '+': true,
    '_': true,
    '~': true,
    '`': true,
  };
  var afterMjakyjZnak = i - 1 >= 0 && isMjakyjZnak[text[i - 1]];
  var afterDelimiter = i - 1 >= 0 && isDelimiter[text[i - 1]];
  var afterVowel = i - 1 >= 0 && isVowel[text[i - 1]];
  //see exceptions
  var afterAlwaysHardConsonant = i - 1 >= 0 && isAlwaysHardConsonant[text[i - 1]];
  return afterMjakyjZnak || afterVowel || afterAlwaysHardConsonant || afterDelimiter;
}

export { kyrylka }