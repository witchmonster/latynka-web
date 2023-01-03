function addToggleThemeEvent() {
    document.getElementById('theme').addEventListener('click', () => {
        window.matchMedia('(prefers-color-scheme: dark)').matches
            ? document.body.classList.toggle('light-mode')
            : document.body.classList.toggle('dark-mode')
    })
}

export { addToggleThemeEvent };