import { runTests } from "../testcases/testSuite.js";

function addRunTestsOnClick(button, statusElement, output, successOutput, failOutput, unhideElements) {
    document.getElementById(button).addEventListener('click', () => {
        var { outPutLog, status } = runTests();
        document.getElementById(output).innerHTML = outPutLog;
        if (outPutLog) {
            document.getElementById(statusElement).textContent = status ? successOutput : failOutput
            document.getElementById(statusElement).style.color = status ? 'green' : 'red'
            unhideElements.forEach(element => {
                document.getElementById(element).classList.remove('hidden')
            });
        }
    })
}

export { addRunTestsOnClick };