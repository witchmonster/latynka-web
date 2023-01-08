import { cyrToLatMainTestSuite } from "./testcases/main/cyrToLatMainTestSuite.js";
import { latToCyrMainTestSuite } from "./testcases/main/latToCyrMainTestSuite.js";
import { cyrToLatExperimentalSuite } from "./testcases/experimental/cyrToLatExperimentalSuite.js";
import { latToCyrExperimentalSuite } from "./testcases/experimental/latToCyrExperimentalSuite.js";
import { init, runAll } from "./testUtils/testUtils.js";

function runTests(loglevel, experimental) {
    init(loglevel ? loglevel : undefined);

    var tests = {
        cyrToLatMainTestSuite,
        latToCyrMainTestSuite
    }

    var experimentalTests = {
        cyrToLatExperimentalSuite,
        latToCyrExperimentalSuite
    }

    if (experimental) {
        tests = {
            ...tests,
            ...experimentalTests
        }
    }

    const allTests = typeof tests === 'object' ? Object.values(tests) : tests;

    return runAll(false, allTests);
}

export { runTests }