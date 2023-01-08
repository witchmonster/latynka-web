import { latToCyr } from "../../../../main/js/converters/latToCyr.js";
import { testTexts } from "../testText.js";

// for tests:
// set optional: true if you want a test to fail with a WARNING (yellow) instead of an ERROR (red)

// for suites:
// by default any suite will propagate a WARNING (yellow) state if any of sub-tests/suites have WARNINGS
// set optional: true if you want suite to be SUCCEED (green) even if there were WARNINGS in tests or sub-suites
const latToCyrMainTestSuite = {
    name: `CORE Latynka => Kyrylycja`,
    fn: latToCyr,
    optional: false,
    testPayload: [
        {
            name: `testovyj tekst 1`,
            optional: false,
            testPayload: testTexts.latToCyr
        },
        {
            name: `apostrofy vseredeni slova majut' zaminjatysja na znak "'"`,
            optional: false,
            testPayload: {

                input: `    m'jakyj 0x0027
    m'jakyj 0x02BC
    m'jakyj 0x055A
    m'jakyj 0xFF07
    m'jakyj 0x2019
    m\'jakyj 0x0060
    m\'jakyj 0x2018
    m'jakyj 0x02B9
    m'jakyj 0xA78C`,

                expected: `    м'який 0x0027
    м'який 0x02BC
    м'який 0x055A
    м'який 0xFF07
    м'який 0x2019
    м'який 0x0060
    м'який 0x2018
    м'який 0x02B9
    м'який 0xA78C`

            }
        },
        {
            name: `"його" => "jogo" na počatku teksta, vsi registry`,
            optional: false,
            testPayload: {
                allRegisters: true,

                input: `jogo`,

                expected: `його`

            }
        }
    ]
}

export { latToCyrMainTestSuite }