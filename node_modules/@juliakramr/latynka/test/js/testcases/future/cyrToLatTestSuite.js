import { cyrToLat } from "../../../../main/js/converters/cyrToLat.js";

// for tests:
// set optional: true if you want a test to fail with a WARNING instead of an ERROR

// for suites:
// set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
const cyrToLatTestSuite = {
    name: `UNIMPLEMENTED FEATURES Kyrylycja => Latynka`,
    fn: cyrToLat,
    optional: true,
    testPayload: [
        {
            name: `apostrofopodibni symvoly za mežamy sliv NE majut' zaminjatysja na znak "'"`,
            optional: true,
            testPayload: {
                // off: 'NOT IMPLEMENTED. FUTURE FEATURE',

                input: `
        ' 0x0027
        ʼ 0x02BC
        ’ 0x2019
        \` 0x0060
        ՚ 0x055A
        ＇ 0xFF07
        ‘ 0x2018
        ʹ 0x02B9
        ꞌ 0xA78C`,

                expected: `
        ' 0x0027
        ʼ 0x02BC
        ’ 0x2019
        \` 0x0060
        ՚ 0x055A
        ＇ 0xFF07
        ‘ 0x2018
        ʹ 0x02B9
        ꞌ 0xA78C`

            }
        }
    ]
}

export { cyrToLatTestSuite };