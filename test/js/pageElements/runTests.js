import { runTests } from "../testSuiteRunner.js";

function addRunTestsOnClick(button, statusElement, output, successOutput, failOutput, unhideElements) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const logLevel = urlParams.get('logLevel')
    const experimental = urlParams.get('experimental') != null
    const future = urlParams.get('future') != null
    document.getElementById(button).addEventListener('click', () => {
        var { outPutLog, status } = runTests(logLevel, experimental, future);
        document.getElementById(output).innerHTML = outPutLog;
        if (outPutLog) {
            document.getElementById(statusElement).textContent = status == 'warn' ? warningOutput : status ? successOutput : failOutput
            document.getElementById(statusElement).style.color = status == 'warn' ? 'darkorange' : status ? 'green' : 'red'
            unhideElements.forEach(element => {
                document.getElementById(element).classList.remove('hidden')
            });
        }
    })
}

export { addRunTestsOnClick };