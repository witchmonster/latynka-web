import { cyrToLatTestSuite as cyrToLat0_9TestSuite } from "./testcases/0.9/cyrToLatTestSuite.js";
import { latToCyrTestSuite as latToCyr0_9TestSuite } from "./testcases/0.9/latToCyrTestSuite.js";
import { cyrToLatTestSuite as cyrToLat1_0TestSuite } from "./testcases/1.0/cyrToLatTestSuite.js";
import { latToCyrTestSuite as latToCyr1_0TestSuite } from "./testcases/1.0/latToCyrTestSuite.js";
import { cyrToLatTestSuite as cyrToLatExperimentalSuite } from "./testcases/1.1/cyrToLatTestSuite.js";
import { latToCyrTestSuite as latToCyrExperimentalSuite } from "./testcases/1.1/latToCyrTestSuite.js";
import { cyrToLatTestSuite as cyrToLatFutureSuite } from "./testcases/future/cyrToLatTestSuite.js";
import { latToCyrTestSuite as latToCyrFutureSuite } from "./testcases/future/latToCyrTestSuite.js";
import { init, runAll } from "./utils/testUtils.js";

const supportedVersions = ['0.9', '1.0'];
const experimentalVersion = '1.1';
const futureVersion = 'future'

for (let i = 0; i < supportedVersions.length; i++) {
    import(`./testcases/${supportedVersions[i]}/cyrToLatTestSuite.js`)
        .then()
    import(`./testcases/${supportedVersions[i]}/latToCyrTestSuite.js`)
        .then()
}

import(`./testcases/${experimentalVersion}/cyrToLatTestSuite.js`)
    .then()
import(`./testcases/${experimentalVersion}/latToCyrTestSuite.js`)
    .then()

import(`./testcases/${futureVersion}/cyrToLatTestSuite.js`)
    .then()
import(`./testcases/${futureVersion}/latToCyrTestSuite.js`)
    .then()

function runTests(loglevel = 'debug', experimental = false, future = false, name = "ALL TESTS") {
    // process.argv.forEach(function (val, index, array) {
    //     console.log(index + ': ' + val);
    // });
    init(loglevel ? loglevel : undefined);

    var tests = {
        cyrToLat0_9TestSuite,
        latToCyr0_9TestSuite,
        cyrToLat1_0TestSuite,
        latToCyr1_0TestSuite
    }

    var experimentalTests = {
        cyrToLatExperimentalSuite,
        latToCyrExperimentalSuite,
    }

    var futureTests = {
        cyrToLatFutureSuite,
        latToCyrFutureSuite
    }

    if (experimental) {
        tests = {
            ...tests,
            ...experimentalTests
        }
    }

    if (future) {
        tests = {
            ...tests,
            ...futureTests
        }
    }

    const allTests = typeof tests === 'object' ? Object.values(tests) : tests;

    return runAll(true, allTests, name);
}

runTests();

const tests = {
    cyrToLatExperimentalSuite,
    latToCyrExperimentalSuite
}

export { runTests, tests }