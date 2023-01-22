import { assertTestCase, assertTestCaseAllRegisters } from "./testAssertions.js";

var logLevel = 'nolog';

var successSymbol = '\u2714 ';
var failSymbol = '\u2718 ';
var warningSymbol = '\u26A0 ';

var successStatus = true;
var failStatus = false;
var warningStatus = 'warn';

const testRoot = '[root]';

const logLevels = {
    'nolog': 0,
    'error': 1,
    'warning': 2,
    'important': 3,
    'info': 4,
    'debug': 5,
    'trace': 6
}

var outPutLog = '';

function init(overrideLogLevel) {
    console.log(`Log level: ${overrideLogLevel}`);
    outPutLog = '';
    if (overrideLogLevel) {
        logLevel = overrideLogLevel;
    }
}

function testLog(text, status, color) {
    const fontColor = color ? color : status == successSymbol ? 'green' : status == failSymbol ? 'red' : '#583bb6';
    outPutLog += `\r\n<div style="color: ${fontColor}">${status ? status : ''}${text}</div>`;
}

var log = {
    debug: function (text) {
        const debugStatus = '--------- LOG.DEBUG --------- ';
        if (logLevels[logLevel] >= logLevels['debug']) {
            testLog(text, debugStatus, 'gray');
            console.log(` ${debugStatus} ${text}`)
        }
    },
    info: function (text) {
        const infoStatus = '--------- LOG.INFO --------- ';
        if (logLevels[logLevel] >= logLevels['info']) {
            testLog(text, infoStatus, '#583bb6');
            console.log(` ${infoStatus} ${text}`)
        }
    },
    important: function (text) {
        const infoStatus = '';
        if (logLevels[logLevel] >= logLevels['important']) {
            testLog(text, infoStatus, '#583bb6');
            console.log(` ${infoStatus} ${text}`)
        }
    },
    warn: function (text) {
        const errorStatus = '--------- LOG.WARNING --------- ';
        if (logLevels[logLevel] >= logLevels['warning']) {
            testLog(text, errorStatus, 'darkorange');
            console.log(` ${errorStatus} ${text}`)
        }
    },
    error: function (text) {
        const errorStatus = '--------- LOG.ERRROR --------- ';
        if (logLevels[logLevel] >= logLevels['error']) {
            testLog(text, errorStatus, 'red');
            console.log(` ${errorStatus} ${text}`)
        }
    }
}

function it(desc, fn) {
    return test(desc, false, fn);
}

function warn(desc, fn) {
    return test(desc, true, fn);
}

function test(desc, optional, fn) {
    optional = optional ? optional : false;
    try {
        fn();
        testLog(desc, successSymbol);
        console.log('\x1b[32m%s\x1b[0m', successSymbol + desc);
        return { status: successStatus };
    } catch (error) {
        testLog(desc, optional ? warningSymbol : failSymbol, optional ? "darkorange" : "red");
        optional ? log.warn(error) : log.error(error);
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', optional ? warningSymbol + desc : failSymbol + desc);
        console.error(error);
        return { status: optional ? warningStatus : failStatus };
    }
}

function assert(isTrue, desc) {
    if (!isTrue) {
        throw new Error(desc);
    }
}

function outputSuiteResult(desc, optional, status) {
    if (desc != testRoot) {
        testLog('_________________________________________________________');
        if (optional) {
            warn(`<b>NABIR TESTIV '${desc}'</b>`, () => {
                assert(status == successStatus, `Opcionalnyj nabir testiv '${desc}' provalyv perevirku'.`);
            })
        } else {
            if (status == warningStatus) {
                warn(`<b>NABIR TESTIV '${desc}'</b>`, () => {
                    assert(false, `Nabir testiv '${desc}' provalyv perevirku.'.`);
                })
            } else {
                it(`<b>NABIR TESTIV '${desc}'</b>`, () => {
                    assert(status == successStatus, `Nabir testiv '${desc}' provalyv perevirku.'.`);
                })
            }
        }
        testLog('\r\n');
    }
}

function runAll(optional, testPayload) {
    return testSuite(testRoot, optional, testPayload, {});
}

function testSuite(desc, optional, testPayload, inherited) {
    optional = optional ? optional : false;

    if (!testPayload || testPayload.length == 0) {
        log.debug(JSON.stringify(testPayload, null, 2));
        log.warn(`Empty test payload for ${desc}`)
        return { status: warningStatus, outPutLog };
    }

    //if payload is suite of tests
    if (Array.isArray(testPayload)) {
        if (desc != testRoot) {
            testLog(`<h3>NABIR TESTIV '${desc}':</h3>`);
        }

        //run all subsuites/subtests
        var status = successStatus;
        for (var i = 0; i < testPayload.length; i++) {
            var testStatus = testSuite(
                testPayload[i].name,
                testPayload[i].optional,
                testPayload[i].testPayload,
                {
                    fn: testPayload[i].fn ? testPayload[i].fn :
                        testPayload.fn ? testPayload.fn : inherited.fn
                }
            );
            if (testStatus.status == warningStatus && status != failStatus) {
                status = testStatus.status;
            }
            if (testStatus.status == failStatus) {
                status = testStatus.status;
            }
        };

        outputSuiteResult(desc, optional, status);

        return { status: optional ? status != failStatus : status, outPutLog };
    } else {
        if (typeof testPayload === 'object' &&
            testPayload.input &&
            testPayload.expected &&
            (testPayload.fn || inherited.fn)
        ) {
            const assertFn = testPayload.allRegisters ? assertTestCaseAllRegisters : assertTestCase;
            if (testPayload.off) {
                testLog(`\u26A0 ${desc}: skipped for the following reason: ${testPayload.off}`, '', 'darkorange');
                return { status: successStatus, outPutLog };
            }
            return test(desc,
                optional,
                testPayload.fn ? () => assertFn(testPayload.fn, testPayload) :
                    inherited.fn ? () => assertFn(inherited.fn, testPayload) :
                        assert(false, `No test function available`)
            );
        } else {
            log.warn(`Malformed test payload for ${desc}`)
            log.debug(`Payload:\r\n${JSON.stringify(testPayload)}`)
            log.debug(`inherited.fn :\r\n${inherited.fn}`)
            return { status: warningStatus, outPutLog };
        }
    }
}


export { init, runAll, assert, log }