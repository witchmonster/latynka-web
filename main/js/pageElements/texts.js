import { klatinoid } from "../../../node_modules/@juliakramr/latynka/index.js"

const texts = {
    cyrToLatTest1: klatinoid.tests.cyrToLatExperimentalSuite.testPayload[0].testPayload.input,


    latToCyrTest1: klatinoid.tests.latToCyrExperimentalSuite.testPayload[0].testPayload.input,

    cyrToLatUvaga: `
    Дізнатись більше про цю версію латинки: <a href="https://www.youtube.com/watch?v=nHeE2x2UNw4">Українська латинка: усі "за" та "проти"</a>

    Увага! Це тестова версія. Про помилки та баги пишіть <a href="https://github.com/jkramr/latynka/issues/new">Сюди</a>.
    
    Наразі слова, написані болгарською та іншими мовами, також перекладатимуться латинкою: 
    Черноризец Храбър ➡ Černoryzec Hrabъr
    Аби запобігти перекладу слова, ви можете загорнути потрібне слово або речення подвійним знаком "@": 
    @@Черноризец Храбър@@ ➡ Черноризец Храбър
    
    Версія конвертера: <a href="https://www.npmjs.com/package/@juliakramr/latynka/v/1.1.9" target="_blank">@juliakramr/latynka:1.1.9</a>`,

    latToCyrUvaga: `
    Дізнатись більше про цю версію латинки: <a href="https://www.youtube.com/watch?v=nHeE2x2UNw4">Українська латинка: усі "за" та "проти"</a>

    Увага! Це тестова версія. Про помилки та баги пишіть <a href="https://github.com/jkramr/latynka/issues/new">Сюди</a>.

    Наразі слова, написані англійською та іншими мовами також перекладатимуться кирилицею: 
    New York ➡ Неw Иорк
    Аби запобігти перекладу слова, ви можете загорнути потрібне слово або речення подвійним знаком "@": 
    @@New York@@ ➡ New York
    
    Версія конвертера: <a href="https://www.npmjs.com/package/@juliakramr/latynka/v/1.1.9" target="_blank">@juliakramr/latynka:1.1.9</a>`,

}

function getText(testName) {
    return texts[testName];
}

export { texts, getText } 