import { dictionary } from "./dictionary/dictionary.js";

const latToCyrUpperCase = dictionary.latToCyr.upperCase;
const cyrToLatUpperCase = dictionary.cyrToLat.upperCase;

const dict = {
    upperCase: {
        ...latToCyrUpperCase,
        ...cyrToLatUpperCase
    }
}

const notAWordCharacterMatcher = /([^0-9a-zа-яіїєґčšžĝ\\])/;
const skipWordsMatcher = /@@(.+?)@@/gi;
const nonGreedyTextMatcher = /([\s\r\n\_\.\,\:\;\@\#\$\%\*\!\?\~\<\>\[\]\{\}\(\)\<\>\…\"\“\”\«\»\—\+\=\\\/\|0-9a-zа-яіїєґčšžĝ’'-]+?)/gi;

function buildRegexWithQuotes(openindQuote, closingQuote) {
    return new RegExp(openindQuote + nonGreedyTextMatcher.source + closingQuote, nonGreedyTextMatcher.flags)
}

function buildRegexWithQuotesExcludeMiddleOfWord(openindQuote, closingQuote) {
    return new RegExp(notAWordCharacterMatcher.source + openindQuote + nonGreedyTextMatcher.source + closingQuote + notAWordCharacterMatcher.source, nonGreedyTextMatcher.flags)
}

function exactMatchSubstring(i, size, dict, text) {
    if (!dict) {
        return false;
    }
    return i + size - 1 < text.length && dict[text.substring(i, i + size)];
}

function matchSubstring(i, size, matcher, text) {
    if (!matcher) {
        return false;
    }
    return i + size - 1 < text.length && matcher.regex.test(text.substring(i, i + size));
}

function preprocessTextWithSkips(text, quotesReplacement, nestedLevels, skips) {
    // add trailing spaces to simplify regex, will be removed after
    text = ' ' + text;
    text += ' ';

    quotesReplacement.forEach(quoteReplace => {
        var hasQuotes = quoteReplace.excludeMiddle
            ? buildRegexWithQuotesExcludeMiddleOfWord(quoteReplace.from.opening, quoteReplace.from.closing)
            : buildRegexWithQuotes(quoteReplace.from.opening, quoteReplace.from.closing);

        //preprocess different types of quotes up to 5 nested levels
        for (let i = 0; i < nestedLevels; i++) {
            var replacement = quoteReplace.excludeMiddle
                ? `$1${quoteReplace.to.opening}$2${quoteReplace.to.closing}$3`
                : `${quoteReplace.to.opening}$1${quoteReplace.to.closing}`;
            var match = text.match(hasQuotes);
            text = text.replace(hasQuotes, replacement)
        }
    });

    if (!skips || skips.length == 0) {
        skips = text.match(skipWordsMatcher, '$1')
        text = text.replace(skipWordsMatcher, '@@ @@');
    }

    text = text.replace(/^ /, ''); //remove preprossesing space at the beginning
    text = text.replace(/ $/, ''); //remove preprossesing space at the end
    return { skips, text };
}

function shouldBeUpperCase(i, size, dict, text) {
    return exactMatchSubstring(i, size, dict, text) && surroundedByUpperCase(text, i);
}

function surroundedByUpperCase(text, i) {
    var previousIsUpperCase = i - 1 >= 0 && dict.upperCase[text[i - 1]];
    var nextIsUpperCase = i + 1 < text.length && dict.upperCase[text[i + 1]];

    var previousTwoAreUpperCase = i - 2 >= 0 && text[i - 1] == ' ' && dict.upperCase[text[i - 2]];
    var nextTwoAreUpperCase = i + 2 < text.length && text[i + 1] == ' ' && dict.upperCase[text[i + 2]];
    var singleInsideUpperCaseText = previousTwoAreUpperCase || nextTwoAreUpperCase;

    var isAcronym = previousIsUpperCase || nextIsUpperCase || singleInsideUpperCaseText;

    return isAcronym;
}

function fn(text) {
    return {
        surroundedByUpperCase,
        shouldBeUpperCase: (i, size, dict) => {
            return shouldBeUpperCase(i, size, dict, text);
        },
        matchSubstring: (i, size, dict) => {
            return matchSubstring(i, size, dict, text);
        },
        exactMatchSubstring: (i, size, dict) => {
            return exactMatchSubstring(i, size, dict, text);
        }
    }
}

const common = {
    preprocessTextWithSkips,
    fn,
    skipWordsMatcher,
    quotes: {
        single: { opening: `\'`, closing: `\'` },
        double: { opening: `\"`, closing: `\"` },
        triangle: { opening: `\«`, closing: `\»` },
        pretty: { opening: `\“`, closing: `\”` }
    }
}

export { common }