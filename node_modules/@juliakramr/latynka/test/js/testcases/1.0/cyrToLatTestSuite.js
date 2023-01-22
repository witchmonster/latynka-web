import { cyrToLat } from "../../../../main/js/converters/cyrToLat.js";

// for tests:
// set optional: true if you want a test to fail with a WARNING instead of an ERROR

// for suites:
// set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
const cyrToLatTestSuite = {
    name: `Versija 1.0 Kyrylycja => Latynka`,
    fn: cyrToLat,
    optional: false,
    testPayload: [
        {
            name: `kontrol'nyj testovyj tekst`,
            optional: false,
            testPayload: {

                input: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед "йо" після приголосних: серйозно, курйоз, але район, мільйон (або міл\`йон?).
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: «НЕ СПОВІЩАТИ» (але "Ще"), "ЮНЕСКО", СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на 'йо'/'ьо' (м'який знак + "о"): п’ятьох, трьох, його, "йогурт", (Йоркшир), /йога/, [Йоганнесбург], _Йовович_.
    В іншомовних словах апостроф перед я, ю, є, ї ставиться не тільки після губних (б, п, в, м, ф) та р, а й після шиплячих та задньоротових (г, к, х, ж, ч, ш), якщо після них чується звук [й]: комп'ютер [-пю-], Дансм'юр [-мюр], бар'єр [-рєр], миш'як [-шя-], Руж'є [-жє], Х'юстон (@@Х'юстон@@) [хю-], Рейк'явік (@@Рейк'явік@@) [-кя-], Г'ята [гя-].
    Болга́рія (заст. укр. @@Болгарщина@@[5], болг. @@България@@), офіційна назва: Респу́бліка Болга́рія (болг. @@Република България@@)`,

                expected: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V'jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered "jo" pislja prygolosnyh: ser'jozno, kur'joz, ale rajon, mil'jon (abo mil'jon?).
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO", SER'JOZNO, KUR'JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na "jo"/"'o" (m'jakyj znak + "o"): p'jatjoh, trjoh, jogo, "jogurt", (Jorkšyr), /joga/, [Jogannesburg], _Jovovyč_.
    V inšomovnyh slovah apostrof pered ja, ju, je, ji stavyt'sja ne til'ky pislja gubnyh (b, p, v, m, f) ta r, a j pislja šypljačyh ta zadnjorotovyh (g, k, h, ž, č, š), jakščo pislja nyh čujet'sja zvuk [j]: komp'juter [-pju-], Dansm'jur [-mjur], bar'jer [-rjer], myš'jak [-šja-], Ruž'je [-žje], H'juston (Х'юстон) [hju-], Rejk'javik (Рейк'явік) [-kja-], G'jata [gja-].
    Bolgárija (zast. ukr. Болгарщина[5], bolg. България), oficijna nazva: Respúblika Bolgárija (bolg. Република България)`
            }
        },
        {
            name: `trykutni lapky «» majut' zaminjuvatysja na anglijs'ki podvijni "" do 2h vlkaden'`,
            optional: false,
            testPayload: {
                input: `    «Вам Данило ізміняє, ходить до артистки,
    Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах + кафе буває.
    Сам коньяк п’є, а артистку винами вгощає.
    І артистка сильно любить вашого Данила.
    «Ще нікого так у жизні, каже, не любила».
    Та артистка — балерина, чоловіка має.
    Він в якомусь міністерстві важний пост займає».`,
                expected: `    "Vam Danylo izminjaje, hodyt' do artystky,
    Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah + kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    I artystka syl'no ljubyt' vašogo Danyla.
    "Šče nikogo tak u žyzni, kaže, ne ljubyla".
    Ta artystka — baleryna, čolovika maje.
    Vin v jakomus' ministerstvi važnyj post zajmaje".`
            }
        },
        {
            name: `slova ta frazy v podvijnomu ravlyku "@@word@@" majut' zalyšatysja nezminnymy`,
            optional: false,
            testPayload: {
                input: `    Болга́рія (заст. укр. @@Болгарщина@@[5], болг. @@България@@), офіційна назва: Респу́бліка Болга́рія (болг. @@Република България@@)`,
                expected: `    Bolgárija (zast. ukr. Болгарщина[5], bolg. България), oficijna nazva: Respúblika Bolgárija (bolg. Република България)`
            }
        },
        {
            name: `apostrofy vseredeni slova majut' zaminjatysja na znak "'"`,
            optional: false,
            testPayload: {

                input: `    м'який 0x0027 APOSTROPHE
    мʼякий 0x02BC MODIFIER LETTER APOSTROPHE
    м՚який 0x055A ARMENIAN APOSTROPHE
    м＇який 0xFF07 FULLWIDTH APOSTROPHE
    м’який 0x2019 RIGHT SINGLE QUOTATION MARK
    м\`який 0x0060 GRAVE ACCENT
    м\‘який 0x2018 LEFT SINGLE QUOTATION MARK
    мʹякий 0x02B9 MODIFIER LETTER PRIME
    мꞌякий 0xA78C LATIN SMALL LETTER SALTILLO`,

                expected: `    m'jakyj 0x0027 APOSTROPHE
    m'jakyj 0x02BC MODIFIER LETTER APOSTROPHE
    m'jakyj 0x055A ARMENIAN APOSTROPHE
    m'jakyj 0xFF07 FULLWIDTH APOSTROPHE
    m'jakyj 0x2019 RIGHT SINGLE QUOTATION MARK
    m'jakyj 0x0060 GRAVE ACCENT
    m'jakyj 0x2018 LEFT SINGLE QUOTATION MARK
    m'jakyj 0x02B9 MODIFIER LETTER PRIME
    m'jakyj 0xA78C LATIN SMALL LETTER SALTILLO`
            }
        },
        {
            name: `apostrofy vkinci slova majut' zaminjatysja na znak "'"`,
            optional: false,
            testPayload: {

                input: `    latyn' 0x0027 APOSTROPHE
    latynʼ 0x02BC MODIFIER LETTER APOSTROPHE
    latyn՚ 0x055A ARMENIAN APOSTROPHE
    latyn＇ 0xFF07 FULLWIDTH APOSTROPHE
    latyn’ 0x2019 RIGHT SINGLE QUOTATION MARK
    latyn\` 0x0060 GRAVE ACCENT
    latyn‘ 0x2018 LEFT SINGLE QUOTATION MARK
    latynʹ 0x02B9 MODIFIER LETTER PRIME
    latynꞌ 0xA78C LATIN SMALL LETTER SALTILLO`,

                expected: `    latyn' 0x0027 APOSTROPHE
    latyn' 0x02BC MODIFIER LETTER APOSTROPHE
    latyn' 0x055A ARMENIAN APOSTROPHE
    latyn' 0xFF07 FULLWIDTH APOSTROPHE
    latyn' 0x2019 RIGHT SINGLE QUOTATION MARK
    latyn' 0x0060 GRAVE ACCENT
    latyn' 0x2018 LEFT SINGLE QUOTATION MARK
    latyn' 0x02B9 MODIFIER LETTER PRIME
    latyn' 0xA78C LATIN SMALL LETTER SALTILLO`
            }
        }
    ]
}

export { cyrToLatTestSuite };