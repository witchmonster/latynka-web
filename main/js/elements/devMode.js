function addDevMode() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const isDevMode = urlParams.get('devMode') != null
    console.log("DevMode enabled: " + isDevMode);
    if (isDevMode) {
        let devModeElements = document.getElementsByClassName('devMode');
        if (devModeElements.length != 0) {
            Array.prototype.slice.call(devModeElements).forEach(element => {
                element.classList.remove('hidden')
            });
        }
    }
}

export { addDevMode };

