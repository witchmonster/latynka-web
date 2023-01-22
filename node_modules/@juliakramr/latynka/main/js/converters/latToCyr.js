import { dictionary } from './dictionary/dictionary.js';
import { common } from './common.js';

var dict = dictionary.latToCyr;
var exceptions = dictionary.exceptions.latToCyr;

function shouldBeJo(text, i) {
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
  var firstLetterInText = i == 0;
  var afterMjakyjZnak = i - 1 >= 0 && dict.mjakyjZnak[text[i - 1]];
  var afterDelimiter = i - 1 >= 0 && dict.delimiters[text[i - 1]];
  var afterVowel = i - 1 >= 0 && dict.vowels[text[i - 1]];
  //see exceptions
  var afterAlwaysHardConsonant = i - 1 >= 0 && isAlwaysHardConsonant[text[i - 1]];
  return firstLetterInText || afterMjakyjZnak || afterVowel || afterAlwaysHardConsonant || afterDelimiter;
}

function latToCyr(text) {

  // -----------------------------------------------------------

  var answer = '';

  var { skips, text } = common.preprocessTextWithSkips(text, [
    { from: common.quotes.single, to: common.quotes.triangle, excludeMiddle: true },
    { from: common.quotes.pretty, to: common.quotes.triangle }
  ], 5);

  var { skips, text } = common.preprocessTextWithSkips(text, [
    { from: common.quotes.double, to: common.quotes.triangle }
  ], 1, skips);

  var fn = common.fn(text); //init fn functions on processed text

  processAlphabetCharacterByCharacter();

  return answer;

  // -----------------------------------------------------------

  function processAlphabetCharacterByCharacter() {
    var nextSkip = 0;
    var i = 0;
    while (i < text.length) {

      if (!dict.matchingSingleLetters[text[i]]) {
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

        //process fixed size skip matchers
        while (matchSkipMatcher(i, 6)) {
          answer += text.substring(i, i + 6);
          i += 6;
        }

        //process exceptions
        var j = exceptions.maxLength - 1;
        while (j > 1) {
          while (fn.exactMatchSubstring(i, j + 1, exceptions[j + 1])) {
            answer += exceptions[j + 1][text.substring(i, i + j + 1)];
            i += j + 1;
          }
          j--;
        }

        //process apostrophes
        while (fn.exactMatchSubstring(i, 3, dict.apostrophe)) {
          answer += dict.apostrophe[text.substring(i, i + 3)];
          i += 3;
        }

        //process jo
        while (fn.exactMatchSubstring(i, 2, dict.joDigraph)) {
          if (shouldBeJo(text, i)) {
            answer += dict.joDigraph[text.substring(i, i + 2)];
            i += 2;
          } else {
            answer += dict.ioDigraph[text.substring(i, i + 2)];
            i += 2;
          }
        }

        //process digraphs
        while (fn.exactMatchSubstring(i, 2, dict.digraphs)) {
          answer += dict.digraphs[text.substring(i, i + 2)];
          i += 2;
        }

        //process mjakyj znak
        while (fn.shouldBeUpperCase(i, 1, dict.mjakyjZnak)) {
          answer += dict.upperCaseMjakyjZnak[text[i]];
          i++;
        }

        //process single characters
        if (fn.exactMatchSubstring(i, 1, dict.singleLetters)) {
          answer += dict.singleLetters[text[i]];
          i++;
        }
      }
    }
  };

  function matchSkipMatcher(i, size) {
    var unicodeCharacterSymbols = /0x[0-9A-Z]{4}/g;

    var skipMatchers = {
      6: { regex: unicodeCharacterSymbols }
    }

    return fn.matchSubstring(i, size, skipMatchers[size])
  }
}

export { latToCyr }