import { dictionary } from './dictionary/dictionary.js';
import { common } from './common.js';

var dict = dictionary.cyrToLat;
var exceptions = dictionary.exceptions.cyrToLat;

function cyrToLat(text) {

  // -----------------------------------------------------------

  var answer = '';

  var { skips, text } = common.preprocessTextWithSkips(text, [
    { from: common.quotes.single, to: common.quotes.double, excludeMiddle: true },
    { from: common.quotes.triangle, to: common.quotes.double },
    { from: common.quotes.pretty, to: common.quotes.double }
  ], 5);

  var fn = common.fn(text); //init fn functions on processed text

  processAlphabetCharacterByCharacter();

  return answer;

  // -----------------------------------------------------------

  function processAlphabetCharacterByCharacter() {
    var nextSkip = 0;
    var i = 0;
    while (i < text.length) {

      if (!dict.matchingSingleLetters[text[i]]) {
        //skip convertation for unmapped characters
        answer += text[i];
        i++;
      } else {

        //process skips
        while (fn.matchSubstring(i, 5, { regex: common.skipWordsMatcher })) {
          const restoreWord = skips[nextSkip].replace(common.skipWordsMatcher, '$1');
          answer += text.substring(i, i + 5).replace(common.skipWordsMatcher, restoreWord);
          nextSkip++;
          i += 5;
        }

        //process exceptions
        var j = exceptions.maxLength;
        while (j > 1) {
          while (fn.exactMatchSubstring(i, j + 1, exceptions[j + 1])) {
            answer += exceptions[j + 1][text.substring(i, i + j + 1)];
            i += j + 1;
          }
          j--;
        }

        //process joDigraph apostrophes
        while (shouldAddApostrophe(i, 2, dict.joDigraph)) {
          answer += '\'';
          answer += dict.joDigraph[text.substring(i, i + 2)];
          i += 2;
        }

        //process digraphs
        while (fn.exactMatchSubstring(i, 2, dict.digraphs)) {
          answer += dict.digraphs[text.substring(i, i + 2)];
          i += 2;
        }

        //process uppercase reverse digraphs
        while (fn.shouldBeUpperCase(i, 1, dict.translatesToUpperCaseDigraph)) {
          answer += dict.translatesToUpperCaseDigraph[text[i]];
          i++;
        }

        //process single letters
        if (fn.exactMatchSubstring(i, 1, dict.singleLetters)) {
          answer += dict.singleLetters[text[i]];
          i++;
        }
      }
    }
  }

  function shouldAddApostrophe(i, size, machingDict) {
    if (!fn.exactMatchSubstring(i, size, machingDict)) {
      return false;
    }

    var firstLetterInText = i == 0;
    var afterConsonant = i - 1 >= 0 && dict.consonants[text[i - 1]];

    // due to specifics of cyrrilic scrypt where йо/ьо is a digraph, 
    // that leaves no ambiguity about hardness/softness of the previous 
    // consonant, there are no exceptions to this rule
    return !firstLetterInText && afterConsonant;
  }
}

export { cyrToLat }