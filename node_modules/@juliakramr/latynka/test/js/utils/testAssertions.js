import { diff_match_patch } from "../../../lib/js/diff/diff_match_patch.js";
import { assert, log } from "./testUtils.js";
import { strUtils } from "./stringUtils.js";

strUtils.addCustomCases();

function assertTestCase(fn, testObject) {
    assertExactTranslation(fn, testObject.input, testObject.expected);
}

function assertTestCaseAllRegisters(fn, testObject) {
    assertForAllRegisters(fn, testObject.input, testObject.expected);
}

function assertExactTranslation(fn, input, expected) {
    const actual = fn(input);
    log.debug(`\r\n[${input}]\r\n 🡃 \r\n[${actual}]`);
    var dmp = new diff_match_patch();
    var d = dmp.diff_main(actual, expected);
    dmp.diff_cleanupSemantic(d);
    var diff = dmp.diff_prettyHtml(d);
    assert(actual == expected, `Input \r\n[\r\n${input}\r\n]\r\nmaje zaminjatysja na:\r\n[\r\n${expected}\r\n]\r\na ne na:\r\n[\r\n${diff}\r\n]\r\n`);
}

function assertForAllRegisters(fn, input, expected) {
    assertExactTranslation(fn, input.toLowerCase(), expected.toLowerCase());
    assertExactTranslation(fn, input.toUpperCase(), expected.toUpperCase());
    assertExactTranslation(fn, input.toProperCase(), expected.toProperCase());
}

export { assertTestCase, assertTestCaseAllRegisters }