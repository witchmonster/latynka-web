import { assert, log } from "../testUtils/testUtils.js";
import { strUtils } from "../../../main/js/stringUtils/stringUtils.js";

strUtils.addCustomCases();

function assertExactTranslation(fn, input, expected) {
    const actual = fn(input);
    log.debug(`\r\n[${input}]\r\n 🡃 \r\n[${actual}]`);
    assert(actual == expected, `Input '${input}' maje zaminjatysja na '${expected}', a ne '${actual}'`);
}

function assertForAllRegisters(fn, input, expected) {
    assertExactTranslation(fn, input.toLowerCase(), expected.toLowerCase());
    assertExactTranslation(fn, input.toUpperCase(), expected.toUpperCase());
    assertExactTranslation(fn, input.toProperCase(), expected.toProperCase());
}

export { assertExactTranslation, assertForAllRegisters }