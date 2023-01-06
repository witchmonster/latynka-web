import { loadFile, replaceTextContent } from "../utils/htmlUtils.js";

const pathToHeader = 'html/header.html';
const pathToStyle = 'css/header.css';

const headerTemplate = document.createElement('template');
const style = document.createElement('style');

function scripts(doc, def) {
    return [
        function addTextToElements() {
            doc.getElementsByName(def.title).textContent = def.textElementValues[def.title];
            replaceTextContent(def.changeTheme, def.textElementValues[def.changeTheme]);
        },
        function addToggleThemeEvent() {
            doc.getElementById(def.sliderTheme).addEventListener('click', () => {
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? doc.body.classList.toggle('light-mode')
                    : doc.body.classList.toggle('dark-mode')
            })
        }
    ]
}

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        loadFile(pathToHeader, (headerHtml) => {
            headerTemplate.innerHTML = headerHtml;
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(headerTemplate.content);
            loadFile(pathToStyle, (styleCss) => {
                style.textContent = styleCss;
                shadowRoot.append(style)
            })
            // loadScripts();
        });
    }
}

customElements.define('header-component', Header);

Header.scripts = scripts

export { Header }
