import { cyrToLat } from "../../../main/js/converters/cyrToLat.js";
import { latToCyr } from "../../../main/js/converters/latToCyr.js";
import { assertExactTranslation, assertForAllRegisters } from "../testUtils/testAssertions.js";
import { init, it, suite } from "../testUtils/testUtils.js";
import { testText } from "./testTexts.js";

function runTests(debug) {
    init(debug ? 'debug' : undefined);
    return suite('', [
        () => suite(`Kyrylycja => Latynka`, [
            () => it(`"його" => "jogo" na počatku teksta, vsi registry`, function () {
                assertForAllRegisters(cyrToLat, 'його', 'jogo');
            }),
            () => it(`testovyj tekst 'cyrillic1'`, function () {
                assertExactTranslation(cyrToLat, testText('cyrillic1'), testText('latin1'));
            })
        ]),
        () => suite(`Latynka => Kyrylycja`, [
            () => it(`"jogo" => "його" na počatku teksta, vsi registry`, function () {
                assertForAllRegisters(latToCyr, 'jogo', 'його');
            }),
            () => it(`testovyj tekst 'latin1'`, function () {
                assertExactTranslation(latToCyr, testText('latin1'), testText('cyrillic1'));
            })
        ])
    ]);
}

export { runTests }