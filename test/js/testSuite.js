import { cyrToLat } from "../../main/js/converters/cyrToLat.js";
import { latToCyr } from "../../main/js/converters/latToCyr.js";
import { assertExactTranslation, assertForAllRegisters } from "./testUtils/testAssertions.js";
import { init, it, warn, suite, optionalSuite } from "./testUtils/testUtils.js";
import { testText } from "./testcases/testTexts.js";

function runTests(loglevel, experimental) {
    init(loglevel ? loglevel : undefined);
    const allTests = [
        //experimental tests
        () => suite(`EXPERIMENTAL OR FUTURE FEATURES: Kyrylycja => Latynka`, [
            () => warn(`apostrofopodibni symvoly za mežamy sliv NE majut' zaminjatysja na znak "'"`, function () {
                assertExactTranslation(cyrToLat, testText('all apostrophes outside words input'), testText('all apostrophes outside words output'));
            })
        ]),
        () => suite(`EXPERIMENTAL OR FUTURE FEATURES: Latynka => Kyrylycja`, [
            () => warn(`apostrofopodibni symvoly za mežamy sliv NE majut' zaminjatysja na znak "'"`, function () {
                assertExactTranslation(latToCyr, testText('all apostrophes outside words input'), testText('all apostrophes outside words output'));
            })
        ]),

        //normal tests
        () => suite(`Kyrylycja => Latynka`, [
            () => it(`testovyj tekst 'cyrillic_input1'`, function () {
                assertExactTranslation(cyrToLat, testText('cyrillic_input1'), testText('cyrillic_output1'));
            }),

            () => it(`"його" => "jogo" na počatku teksta, vsi registry`, function () {
                assertForAllRegisters(cyrToLat, 'його', 'jogo');
            }),

            () => it(`apostrofy vseredeni slova majut' zaminjatysja na znak "'"`, function () {
                assertExactTranslation(cyrToLat, testText('all apostrophes inside words input'), testText('all apostrophes inside words output'));
            }),

            () => it(`apostrofy vkinci slova majut' zaminjatysja na znak "'"`, function () {
                assertExactTranslation(cyrToLat, testText('all apostrophes at the end of words input'), testText('all apostrophes at the end of words output'));
            })
        ]),
        () => suite(`Latynka => Kyrylycja`, [
            () => it(`testovyj tekst 'latin1'`, function () {
                assertExactTranslation(latToCyr, testText('latin_input1'), testText('latin_output1'));
            }),

            () => it(`"jogo" => "його" na počatku teksta, vsi registry`, function () {
                assertForAllRegisters(latToCyr, 'jogo', 'його');
            })
        ])
    ];

    if (!experimental) {
        allTests.shift();
        allTests.shift();
    }

    return suite('', allTests);
}

export { runTests }