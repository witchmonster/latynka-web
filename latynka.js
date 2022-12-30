function latynka(text) {
  var answer = '';
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
    'ш': 'š'
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
  };

  var digraphs = {
    //ё
    'йо': 'jo',
    'ьо': 'jo'
  };

  var reverseDigraphs = {
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

  var upperCaseReverseDigraphs = {
    'Є': 'JE',
    'Ї': 'JI',
    'Щ': 'ŠČ',
    'Ю': 'JU',
    'Я': 'JA'
  };

  var special = {
    'Ь': '\'',
    'ь': '\'',
    '\'': '’'
  };

  var russiaDetected = '>>>>>>>>> RUSSIA IS A TERRORIST STATE!!! <<<<<<<<<';

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
    ...reverseDigraphs,
    ...special,
    ...russianAlert
  };

  function isUpperCaseReverseDigraph(text, i) {
    var previousIsUpperCase = i - 1 >= 0 && upperCase[text[i - 1]];
    var nextIsUpperCase = i + 1 < text.length && upperCase[text[i + 1]];
    var isAcronym = previousIsUpperCase || nextIsUpperCase;
    return upperCaseReverseDigraphs[text[i]] && isAcronym;
  }

  //todo add case insensitive match
  function matchSubstring(i, size, dict) {
    return i + size - 1 < text.length && dict[text.substring(i, i + size)];
  }

  var i = 0;
  while (i < text.length) {
    if (converter[text[i]]) {

      //process digraphs
      if (matchSubstring(i, 2, digraphs)) {
        answer += digraphs[text.substring(i, i + 2)];
        i += 2;
      }

      //process uppercase reverse digraphs
      if (i < text.length && isUpperCaseReverseDigraph(text, i)) {
        answer += upperCaseReverseDigraphs[text[i]];
        i++;
      }

      //process single letters
      if (i < text.length && converter[text[i]]) {
        answer += converter[text[i]];
        i++;
      }
    } else {
      //skip convertation for unmapped characters
      answer += text[i];
      i++;
    }
  }
  return answer;
}