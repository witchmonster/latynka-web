import { latToCyr } from "../../../../main/js/converters/latToCyr.js";

// for tests:
// set optional: true if you want a test to fail with a WARNING instead of an ERROR

// for suites:
// set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
const latToCyrTestSuite = {
    name: `UNIMPLEMENTED FEATURES Latynka => Kyrylycja`,
    fn: latToCyr,
    optional: true,
    testPayload: [{
        name: `jotovani naprykinci slova a takož, slovo "Я" majut perekladatysja jak "JA"/"JE"/"JU"/"JI" v teksti z velykymy literamy`,
        optional: true,
        testPayload: {

            input: `Ukrajins'ka kompanija, roztašovana v Kyjevi, VIDMOVLJAJE V SPIVBESIDI ukrajinomovnij osobi čerez te, ščo vona povtoryla u svojemu rezjume ukrajins'ke zakonodavstvo.
    NE HOČU SPIVPRACJUVATY Z KOMPANIJAMY, JAKI NE VMIJUT' VESTY BIZNES DERŽAVNOJU MOVOJU JA NE BUDU.
    JA VIDMOVLJAJU, VONA VIDMOVLJAJE, VIN VIDMOVLJAJET'SJA VID MIL'JARDU.`,

            expected: `Українська компанія, розташована в Києві, ВІДМОВЛЯЄ В СПІВБЕСІДІ україномовній особі через те, що вона повторила у своєму резюме українське законодавство.
    НЕ ХОЧУ СПІВПРАЦЮВАТИ З КОМПАНІЯМИ, ЯКІ НЕ ВМІЮТЬ ВЕСТИ БІЗНЕС ДЕРЖАВНОЮ МОВОЮ Я НЕ БУДУ.
    Я ВІДМОВЛЯЮ, ВОНА ВІДМОВЛЯЄ, ВІН ВІДМОВЛЯЄТЬСЯ ВІД МІЛЬЯРДУ.`
        }
    },
    {
        name: `podvijni lapky "" majut' zaminjuvatysja na ukrajins'ki trykutni «» do 5ty vkladen'`,
        optional: true,
        testPayload: {
            input: `    "Vam Danylo izminjaje, hodyt' do artystky,
"Halvu nosyt', i prjanyky; moločni sosysky.
Vin iz neju v restoranah + kafe buvaje.
Sam kon'jak p'je, a artystku vynamy vgoščaje.
"I artystka syl'no ljubyt' vašogo Danyla.
"Šče nikogo tak u "žyzni", kaže", ne ljubyla".
Ta artystka — baleryna, čolovika maje".
Vin v jakomus' ministerstvi važnyj post zajmaje".`,
            expected: `    «Вам Данило ізміняє, ходить до артистки,
«Халву носить, і пряники; молочні сосиски.
Він із нею в ресторанах + кафе буває.
Сам коньяк п’є, а артистку винами вгощає.
«І артистка сильно любить вашого Данила.
«Ще нікого так у «жизні», каже», не любила».
Та артистка — балерина, чоловіка має».
Він в якомусь міністерстві важний пост займає».`
        }
    },
    {
        name: `apostrofopodibni symvoly za mežamy sliv NE majut' zaminjatysja na znak "'"`,
        optional: true,
        testPayload: {
            // off: 'NOT IMPLEMENTED. FUTURE FEATURE',

            input: `
    ' 0x0027
    ʼ 0x02BC
    ’ 0x2019
    \` 0x0060
    ՚ 0x055A
    ＇ 0xFF07
    ‘ 0x2018
    ʹ 0x02B9
    ꞌ 0xA78C`,

            expected: `
    ' 0x0027
    ʼ 0x02BC
    ’ 0x2019
    \` 0x0060
    ՚ 0x055A
    ＇ 0xFF07
    ‘ 0x2018
    ʹ 0x02B9
    ꞌ 0xA78C`

        }
    },
    {
        name: `apostrofy vseredeni slova majut' zaminjatysja na znak "’"`,
        optional: true,
        testPayload: {

            input: `    m'jakyj 0x0027
mʼjakyj 0x02BC
m՚jakyj 0x055A
m＇jakyj 0xFF07
m’jakyj 0x2019
m\`jakyj 0x0060
m\‘jakyj 0x2018
mʹjakyj 0x02B9
mꞌjakyj 0xA78C`,

            expected: `    м’який 0x0027
м’який 0x02BC
м’який 0x055A
м’який 0xFF07
м’який 0x2019
м’який 0x0060
м’який 0x2018
м’який 0x02B9
м’який 0xA78C`
        }
    },
    {
        name: `apostrofy vkinci slova majut' zaminjatysja na znak "ь"`,
        optional: true,
        testPayload: {

            input: `    latyn' 0x0027
latynʼ 0x02BC
latyn՚ 0x055A
latyn＇ 0xFF07
latyn’ 0x2019
latyn\` 0x0060
latyn‘ 0x2018
latynʹ 0x02B9
latynꞌ 0xA78C`,

            expected: `    латинь 0x0027
латинь 0x02BC
латинь 0x055A
латинь 0xFF07
латинь 0x2019
латинь 0x0060
латинь 0x2018
латинь 0x02B9
латинь 0xA78C`
        }
    }
    ]
}

export { latToCyrTestSuite }