import { cyrToLat } from "../../../../main/js/converters/cyrToLat.js";
import { testTexts } from "../testText.js";

// for tests:
// set optional: true if you want a test to fail with a WARNING instead of an ERROR

// for suites:
// set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
const cyrToLatMainTestSuite = {
    name: `CORE Kyrylycja => Latynka`,
    fn: cyrToLat,
    optional: false,
    testPayload: [
        {
            name: `kontrol'nyj testovyj tekst`,
            optional: false,
            testPayload: testTexts.cyrToLat
        },
        {
            name: `apostrofy vseredeni slova majut' zaminjatysja na znak "'"`,
            optional: false,
            testPayload: {

                input: `    м'який 0x0027 APOSTROPHE
    мʼякий 0x02BC MODIFIER LETTER APOSTROPHE
    м՚який 0x055A ARMENIAN APOSTROPHE
    м＇який 0xFF07 FULLWIDTH APOSTROPHE
    м’який 0x2019 RIGHT SINGLE QUOTATION MARK
    м\`який 0x0060 GRAVE ACCENT
    м\‘який 0x2018 LEFT SINGLE QUOTATION MARK
    мʹякий 0x02B9 MODIFIER LETTER PRIME
    мꞌякий 0xA78C LATIN SMALL LETTER SALTILLO`,

                expected: `    m'jakyj 0x0027 APOSTROPHE
    m'jakyj 0x02BC MODIFIER LETTER APOSTROPHE
    m'jakyj 0x055A ARMENIAN APOSTROPHE
    m'jakyj 0xFF07 FULLWIDTH APOSTROPHE
    m'jakyj 0x2019 RIGHT SINGLE QUOTATION MARK
    m'jakyj 0x0060 GRAVE ACCENT
    m'jakyj 0x2018 LEFT SINGLE QUOTATION MARK
    m'jakyj 0x02B9 MODIFIER LETTER PRIME
    m'jakyj 0xA78C LATIN SMALL LETTER SALTILLO`

            }
        },
        {
            name: `apostrofy vkinci slova majut' zaminjatysja na znak "'"`,
            optional: false,
            testPayload: {

                input: `    latyn' 0x0027 APOSTROPHE
    latynʼ 0x02BC MODIFIER LETTER APOSTROPHE
    latyn՚ 0x055A ARMENIAN APOSTROPHE
    latyn＇ 0xFF07 FULLWIDTH APOSTROPHE
    latyn’ 0x2019 RIGHT SINGLE QUOTATION MARK
    latyn\` 0x0060 GRAVE ACCENT
    latyn‘ 0x2018 LEFT SINGLE QUOTATION MARK
    latynʹ 0x02B9 MODIFIER LETTER PRIME
    latynꞌ 0xA78C LATIN SMALL LETTER SALTILLO`,

                expected: `    latyn' 0x0027 APOSTROPHE
    latyn' 0x02BC MODIFIER LETTER APOSTROPHE
    latyn' 0x055A ARMENIAN APOSTROPHE
    latyn' 0xFF07 FULLWIDTH APOSTROPHE
    latyn' 0x2019 RIGHT SINGLE QUOTATION MARK
    latyn' 0x0060 GRAVE ACCENT
    latyn' 0x2018 LEFT SINGLE QUOTATION MARK
    latyn' 0x02B9 MODIFIER LETTER PRIME
    latyn' 0xA78C LATIN SMALL LETTER SALTILLO`

            }
        },
        {
            name: `"jogo" => "його" na počatku teksta, vsi registry`,
            optional: false,
            testPayload: {
                allRegisters: true,

                input: `його`,

                expected: `jogo`

            }
        }
    ]
}


export { cyrToLatMainTestSuite };