import { loadFile, replaceTextContent } from "../utils/htmlUtils.js";

const pathToFooter = 'html/footer.html';
const pathToStyle = 'css/footer.css';

const footerTemplate = document.createElement('template');
const style = document.createElement('style');

function scripts(doc, def) {
    return [
        function addTextToElements() {
            if (def.textElementValues[def.linkToReverse]) {
                doc.getElementById(def.linkToReverse).href = def.linkToReverseRef;
                replaceTextContent(def.linkToReverse, def.textElementValues[def.linkToReverse]);
            }
        },
    ]
}

function loadScripts() {
    for (let i = 0; i < scripts.length; i++) {
        scripts[i]();
    }
}

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        loadFile(pathToFooter, (footerHtml) => {
            footerTemplate.innerHTML = footerHtml;
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(footerTemplate.content);
            loadFile(pathToStyle, (styleCss) => {
                style.textContent = styleCss;
                shadowRoot.append(style)
            })
            // loadScripts();
        });
    }
}

customElements.define('footer-component', Footer);

Footer.scripts = scripts

export { Footer }
