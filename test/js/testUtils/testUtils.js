var logLevel = 'nolog';

var successSymbol = '\u2714 ';
var failSymbol = '\u2718 ';
var warningSymbol = '\u26A0 ';

var successStatus = true;
var failStatus = false;
var warningStatus = 'warn';

const logLevels = {
    'nolog': 0,
    'error': 1,
    'warning': 2,
    'info': 3,
    'debug': 4
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

function test(desc, warning, fn) {
    try {
        fn();
        testLog(desc, successSymbol);
        console.log('\x1b[32m%s\x1b[0m', successSymbol + desc);
        return { status: successStatus };
    } catch (error) {
        testLog(desc, warning ? warningSymbol : failSymbol, warning ? "darkorange" : "red");
        warning ? log.warn(error) : log.error(error);
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', warning ? warningSymbol + desc : failSymbol + desc);
        console.error(error);
        return { status: warning ? warningStatus : failStatus };
    }
}

function assert(isTrue, desc) {
    if (!isTrue) {
        throw new Error(desc);
    }
}

function suite(desc, tests) {
    return testSuite(desc, false, tests);
}

function optionalSuite(desc, tests) {
    return testSuite(desc, true, tests);
}

function testSuite(desc, warningSuccess, tests) {
    if (desc != '') {
        testLog(`<h3>NABIR TESTIV '${desc}':</h3>`);
    }
    var status = successStatus;
    for (var i = 0; i < tests.length; i++) {
        var testStatus = tests[i]();
        if (testStatus.status == warningStatus && status != failStatus) {
            status = testStatus.status;
        }
        if (testStatus.status == failStatus) {
            status = testStatus.status;
        }
    };

    if (desc != '') {
        testLog('_________________________________________________________');
        if (warningSuccess) {
            it(`<b>NABIR TESTIV '${desc}'</b>`, () => {
                assert(status == successStatus, `Opcionalnyj nabir testiv '${desc}' provalyv perevirku'.`);
            })
        } else {
            if (status == warningStatus) {
                warn(`<b>NABIR TESTIV '${desc}'</b>`, () => {
                    assert(false, `Nabir testiv '${desc}' provalyv perevirku.'.`);
                })
            }
            if (status == failStatus) {
                it(`<b>NABIR TESTIV '${desc}'</b>`, () => {
                    assert(false, `Nabir testiv '${desc}' provalyv perevirku.'.`);
                })
            }
        }
        testLog('\r\n');
    }

    return { status: warningSuccess ? status != failStatus : status, outPutLog };
}

export { init, it, warn, assert, suite, optionalSuite, log }