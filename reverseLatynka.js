function kyrylka(word) {
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

  var trigrafs = {
    '\'ja': '\'я',
    '\'ji': '\'ї',
    '\'je': '\'є',
    '\'ju': '\'ю'
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
    '\'': 'ь'
    //'\'': 'Ь'
  };
  var converter = {
    ...lowerCase,
    ...upperCase,
    ...digraphs,
    ...special
  };

  var i = 0;

  while (i < word.length) {
    if (!converter[word[i]]) {
      answer += word[i];
      i++;
    } else {
      if (i + 2 < word.length) { //trigraphs
        var trigraf = word[i] + word[i + 1] + word[i + 2];
        if (trigrafs[trigraf]) {
          answer += trigrafs[trigraf];
          i += 3;
        }
      }

      if (i + 1 < word.length) { //digraphs
        var digraph = word[i] + word[i + 1];
        if (joDigraph[digraph]) {
          if (shouldBeJo(word, i)) {
            answer += joDigraph[digraph];
            i += 2;
          } else {
            answer += 'ьо';
            i += 2;
          }
        } else if (digraphs[digraph]) {
          answer += digraphs[digraph];
          i += 2;
        }
      }

      if (i < word.length && converter[word[i]]) {
        answer += converter[word[i]];
        i++;
      }
    }
  }
  return answer;
}

function shouldBeJo(word, i) {
  var isVowel = {
    'a': true,
    'e': true,
    'i': true,
    'o': true,
    'u': true
  };
  var isGubna = {
    'b': true,
    'p': true,
    'v': true,
    'm': true,
    'f': true
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
  var afterDelimiter = i - 1 >= 0 && isDelimiter[word[i - 1]];
  var afterVowel = i - 1 >= 0 && isVowel[word[i - 1]];
  return afterVowel || afterDelimiter;
}