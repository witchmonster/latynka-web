import { cyrToLat } from "../../../../main/js/converters/cyrToLat.js";
import { testTexts } from "../../../../main/js/pageElements/texts.js";

// for tests:
// set optional: true if you want a test to fail with a WARNING instead of an ERROR

// for suites:
// set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
const cyrToLatMainTestSuite = {
    name: `CORE Kyrylycja => Latynka`,
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
    Особливі випадки зі змішаним регістром: "НЕ СПОВІЩАТИ" (але "Ще"), "ЮНЕСКО", СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на "йо"/"ьо" (м'який знак + "о"): п’ятьох, трьох, його, "йогурт", (Йоркшир), /йога/, [Йоганнесбург], _Йовович_.`,

                expected: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V'jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered "jo" pislja prygolosnyh: ser'jozno, kur'joz, ale rajon, mil'jon (abo mil'jon?).
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO", SER'JOZNO, KUR'JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na "jo"/"'o" (m'jakyj znak + "o"): p'jatjoh, trjoh, jogo, "jogurt", (Jorkšyr), /joga/, [Jogannesburg], _Jovovyč_.`

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
        },
        {
            name: `"jogo" => "його" na počatku teksta, vsi registry`,
            optional: false,
            testPayload: {
                allRegisters: true,

                input: `його`,

                expected: `jogo`

            }
        }
    ]
}


export { cyrToLatMainTestSuite };