var logLevel = 'info';
var success = '\u2714 ';
var fail = '\u2718 ';

const logLevels = {
    'error': 1,
    'info': 2,
    'debug': 3
}

var outPutLog = '';

function init(overrideLogLevel) {
    outPutLog = '';
    if (overrideLogLevel) {
        logLevel = overrideLogLevel;
    }
}

function testLog(text, status, color) {
    const fontColor = color ? color : status == success ? 'green' : status == fail ? 'red' : '#583bb6';
    outPutLog += `\r\n<div style="color: ${fontColor}">${status ? status : ''}${text}</div>`;
}

function debug(text) {
    const debugStatus = '--------- LOG.DEBUG --------- ';
    if (logLevels[logLevel] >= logLevels['debug']) {
        testLog(text, debugStatus, 'gray');
        console.log(` ${debugStatus} ${text}`)
    }
}

function info(text) {
    const infoStatus = '--------- LOG.INFO --------- ';
    if (logLevels[logLevel] >= logLevels['info']) {
        testLog(text, infoStatus, '#583bb6');
        console.log(` ${infoStatus} ${text}`)
    }
}

function error(text) {
    const errorStatus = '--------- LOG.ERRROR --------- ';
    if (logLevels[logLevel] >= logLevels['error']) {
        testLog(text, errorStatus, 'red');
        console.log(` ${errorStatus} ${text}`)
    }
}

var log = {
    debug,
    info,
    error
}

function it(desc, fn) {
    try {
        fn();
        testLog(desc, success);
        console.log('\x1b[32m%s\x1b[0m', success + desc);
        return true;
    } catch (error) {
        testLog(desc, fail);
        log.error(error);
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', fail + desc);
        console.error(error);
        return false;
    }
}

function assert(isTrue, desc) {
    if (!isTrue) {
        throw new Error(desc);
    }
}

function suite(desc, tests) {
    if (desc != '') {
        testLog(`<h3>NABIR TESTIV '${desc}':</h3>`);
    }
    var status = true;
    for (var i = 0; i < tests.length; i++) {
        var testStatus = tests[i]();
        if (testStatus == false || testStatus.status == false) {
            status = false;
        }
    };

    if (desc != '') {
        testLog('_________________________________________________________');
        it(`<b>NABIR TESTIV '${desc}'</b>`, () => {
            assert(status, `Nabir '${desc}' provalyv perevirku. Vypravte vsi pomylky vkazani vyšče i perezapustit'.`);
        })
        testLog('');
    }

    return { status, outPutLog };
}

export { init, it, assert, suite, log }