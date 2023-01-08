import { dictionary } from './dictionary/dictionary.js';
import { exceptions } from './dictionary/exceptions.js';

var dict = dictionary.cyrToLat;
var exception = exceptions.cyrToLat;

function cyrToLat(text) {
  var answer = '';

  //todo add case insensitive match
  function exactMatchSubstring(i, size, dict) {
    if (!dict) {
      return false;
    }
    return i + size - 1 < text.length && dict[text.substring(i, i + size)];
  }

  function matchSubstring(i, size, matcher) {
    if (!matcher) {
      return false;
    }
    return i + size - 1 < text.length && matcher.regex.test(text.substring(i, i + size));
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

  var hasSingleQuotes = /([^\wа-яіїєґčšžĝ’'])'([\w\s\.\,\:\;\@\#\$\%\*\!\?\~\<\>\[\]\{\}\(\)\"\…\—а-яіїєґčšžĝ’'-]+?)'([^\wа-яіїєґčšžĝ’'])/gi;
  var hasTriangleQuotes = /([^\wа-яіїєґčšžĝ’'])«([\r\n\w\s\.\,\:\;\@\#\$\%\*\!\?\~\<\>\[\]\{\}\(\)\…\"\—а-яіїєґčšžĝ’'-]+?)»([^\wа-яіїєґčšžĝ’'])/gi;
  var skipWords = /@@([\w\.\:\;\@\#\$\%\*\!\?\~\<\>\[\]\{\}\(\)\", а-яіїєґčšžĝ’'—-]+?)@@/gi;

  // add trailing spaces to simplify regex, will be removed after
  text = ' ' + text;
  text += ' ';

  //preprocess single quotes so they don't clash with "ь"
  text = text.replace(hasSingleQuotes, '$1"$2"$3')
  //remove leftover nested single quotes
  text = text.replace(hasSingleQuotes, '$1"$2"$3')
  //preprocess triangle quotes
  text = text.replace(hasTriangleQuotes, '$1"$2"$3')
  //remove leftover nested triangle quotes
  text = text.replace(hasTriangleQuotes, '$1"$2"$3')

  const skips = text.match(skipWords, '$1')
  text = text.replace(skipWords, '@@ @@');

  var nextSkip = 0;
  var i = 0;
  while (i < text.length) {

    if (dict.singleLetters[text[i]]) {

      //process skips
      while (matchSubstring(i, 5, { regex: skipWords })) {
        const restoreWord = skips[nextSkip].replace(skipWords, '$1');
        answer += text.substring(i, i + 5).replace(skipWords, restoreWord);
        nextSkip++;
        i += 5;
      }

      //process exceptions
      var j = exception.maxLength;
      while (j > 1) {
        while (exactMatchSubstring(i, j + 1, exception[j + 1])) {
          answer += exception[j + 1][text.substring(i, i + j + 1)];
          i += j + 1;
        }
        j--;
      }

      //process joDigraph apostrophes
      if (exactMatchSubstring(i, 2, dict.joDigraph) && shouldAddApostrophe(text, i)) {
        answer += '\'';
        answer += dict.joDigraph[text.substring(i, i + 2)];
        i += 2;
      }

      //process digraphs
      if (exactMatchSubstring(i, 2, dict.digraphs)) {
        answer += dict.digraphs[text.substring(i, i + 2)];
        i += 2;
      }

      //process uppercase reverse digraphs
      if (isTranslatesToUpperCaseDigraph(text, i)) {
        answer += dict.translatesToUpperCaseDigraph[text[i]];
        i++;
      }

      //process single letters
      if (exactMatchSubstring(i, 1, dict.singleLetters)) {
        answer += dict.singleLetters[text[i]];
        i++;
      }
    } else {
      //skip convertation for unmapped characters
      answer += text[i];
      i++;
    }
  }

  answer = answer.replace(/^ /, ''); //remove preprossesing space at the beginning
  answer = answer.replace(/ $/, ''); //remove preprossesing space at the end
  return answer;
}

export { cyrToLat }