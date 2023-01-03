import { dictionary } from './dictionary/dictionary.js';
import { exceptions } from './dictionary/exceptions.js';

var dict = dictionary.cyrToLat;
var exception = exceptions.cyrToLat;

function cyrToLat(text) {
  var answer = '';

  //todo add case insensitive match
  function matchSubstring(i, size, dict) {
    if (i + size - 1 >= text.length) {
      return false;
    }
    var word = text.substring(i, i + size);
    return dict[word];
  }

  function isTranslatesToUpperCaseDigraph(text, i) {
    var previousIsUpperCase = i - 1 >= 0 && dict.upperCase[text[i - 1]];
    var nextIsUpperCase = i + 1 < text.length && dict.upperCase[text[i + 1]];
    var isAcronym = previousIsUpperCase || nextIsUpperCase;
    return isAcronym && dict.translatesToUpperCaseDigraph[text[i]];
  }

  function shouldAddApostrophe(text, i) {

    var firstLetterInText = i == 0;
    var afterConsonant = i - 1 >= 0 && dict.consonants[text[i - 1]]

    // due to specifics of cyrrilic scrypt where йо/ьо is a digraph, 
    // that leaves no ambiguity about hardness/softness of the previous 
    // consonant, there are no exceptions to this rule
    return !firstLetterInText && afterConsonant;
  }

  var i = 0;
  while (i < text.length) {
    if (dict.singleLetters[text[i]]) {

      //process exceptions
      var j = exception.maxLength;
      while (j > 1) {
        while (matchSubstring(i, j + 1, exception[j + 1][text.substring(i, i + j + 1)])) {
          answer += exception[j + 1][text.substring(i, i + j + 1)];
          i += j + 1;
        }
        j--;
      }

      //process joDigraph apostrophes
      if (matchSubstring(i, 2, dict.joDigraph) && shouldAddApostrophe(text, i)) {
        answer += '’';
        answer += dict.joDigraph[text.substring(i, i + 2)];
        i += 2;
      }

      //process digraphs
      if (matchSubstring(i, 2, dict.digraphs)) {
        answer += dict.digraphs[text.substring(i, i + 2)];
        i += 2;
      }

      //process uppercase reverse digraphs
      if (isTranslatesToUpperCaseDigraph(text, i)) {
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

export { cyrToLat }