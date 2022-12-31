import { dictionary } from './dictionary.js';

var dict = dictionary.cyrToLat;

function latynka(text) {
  var answer = '';

  function isUpperCaseReverseDigraph(text, i) {
    var previousIsUpperCase = i - 1 >= 0 && dict.upperCase[text[i - 1]];
    var nextIsUpperCase = i + 1 < text.length && dict.upperCase[text[i + 1]];
    var isAcronym = previousIsUpperCase || nextIsUpperCase;
    return isAcronym && dict.translatesToDigraph[text[i]];
  }

  //todo add case insensitive match
  function matchSubstring(i, size, dict) {
    return i + size - 1 < text.length && dict[text.substring(i, i + size)];
  }

  var i = 0;
  while (i < text.length) {
    if (dict.singleLetters[text[i]]) {

      //process digraphs
      if (matchSubstring(i, 2, dict.digraphs)) {
        answer += dict.digraphs[text.substring(i, i + 2)];
        i += 2;
      }

      //process uppercase reverse digraphs
      if (isUpperCaseReverseDigraph(text, i)) {
        answer += dict.translatesToUpperCaseDigraph[text[i]];
        i++;
      }

      //process single letters
      if (matchSubstring(i, 1, dict.singleLetters)) {
        answer += dict.singleLetters[text[i]];
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

export { latynka }