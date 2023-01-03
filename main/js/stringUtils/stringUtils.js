const matchAllUkrainianWords = /(([\wйцукенгґшщзхїфівапролджєячсмитьбю-]+\'?’?[\wйцукенгґшщзхїфівапролджєячсмитьбю’-]+)|([\wйцукенгґшщзхїфівапролджєячсмитьбю-]))/gi;

function setCharToUpperCase(str, i) {
    return setCharAt(str, i, str.charAt(i).toUpperCase())
}

function setCharToLowerCase(str, i) {
    return setCharAt(str, i, str.charAt(i).toLowerCase())
}

function setCharAt(str, i, char) {
    if (i > str.length - 1) return str;
    return str.substring(0, i) + char + str.substring(i + 1);
}

function addCustomCases() {
    String.prototype.toProperCase = function () {
        return this.replace(matchAllUkrainianWords, function (word) {
            return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        })
    };

    // caseArray - array of booleans or binary string '100010'
    String.prototype.toCase = function (caseArray) {
        return this.replace(matchAllUkrainianWords, function (word) {
            if (!caseArray || caseArray.length != word.length) {
                return word;
            }
            if ((typeof caseArray === 'string' || caseArray instanceof String)) {
                caseArray = caseArray.split('');

                caseArray = caseArray.map(element => {
                    if (element == '1') {
                        return true;
                    }
                    return false;
                });
            }
            for (let i = 0; i < caseArray.length; i++) {
                if (caseArray[i]) {
                    word = setCharToUpperCase(word, i);
                } else {
                    word = setCharToLowerCase(word, i);
                }
            }
            return word;
        })
    };
}

const strUtils = {
    addCustomCases,
    setCharToLowerCase,
    setCharToUpperCase,
    setCharAt
}

export { strUtils }