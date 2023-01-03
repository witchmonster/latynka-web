import { addToggleThemeEvent } from "../../main/js/pageElements/theme.js";
import { addRunTestsOnClick } from "./pageElements/runTests.js";

window.onload = () => {

    addToggleThemeEvent();

    addRunTestsOnClick(
        submitButton,
        statusElement,
        output,
        successOutput,
        failOutput,
        toggleElements //unhide elements
    );
}