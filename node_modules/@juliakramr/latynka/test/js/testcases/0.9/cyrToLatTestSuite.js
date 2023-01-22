import { cyrToLat } from "../../../../main/js/converters/cyrToLat.js";

// for tests:
// set optional: true if you want a test to fail with a WARNING instead of an ERROR

// for suites:
// set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
const cyrToLatTestSuite = {
    name: `Versija 0.9 Kyrylycja => Latynka`,
    fn: cyrToLat,
    optional: false,
    testPayload: [
        {
            name: `kontrol'nyj testovyj tekst`,
            optional: false,
            testPayload: {

                input: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед [йо] після приголосних: серйозно, курйоз, але район, мільйон (або міл\`йон?).
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: НЕ СПОВІЩАТИ (але [Ще]), ЮНЕСКО, СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на [йо]/(м'який знак + [о]): п’ятьох, трьох, його, йогурт, (Йоркшир), /йога/, Йоганнесбург, _Йовович_.`,

                expected: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V'jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered [jo] pislja prygolosnyh: ser'jozno, kur'joz, ale rajon, mil'jon (abo mil'jon?).
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: NE SPOVIŠČATY (ale [Šče]), JUNESKO, SER'JOZNO, KUR'JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na [jo]/(m'jakyj znak + [o]): p'jatjoh, trjoh, jogo, jogurt, (Jorkšyr), /joga/, Jogannesburg, _Jovovyč_.`
            }
        },
        {
            name: `"його" => "jogo" na počatku teksta, vsi registry`,
            optional: false,
            testPayload: {
                //this test will iterate over all possible registers of the word e.g. JOGO and Jogo will be tested as well
                allRegisters: true,

                input: `його`,

                expected: `jogo`

            }
        },
        {
            name: `"jogo" => "його" na počatku rjadku, vsi registry`,
            optional: false,
            testPayload: {
                allRegisters: true,

                input: `\r\nйого`,

                expected: `\r\njogo`

            }
        },
        {
            name: `"цього" => "cjogo", vsi registry`,
            optional: false,
            testPayload: {
                //this test will iterate over all possible registers of the word e.g. JOGO and Jogo will be tested as well
                allRegisters: true,

                input: `цього`,

                expected: `cjogo`

            }
        },
        {
            name: `"Україна" => "Ukrajina", vsi registry`,
            optional: false,
            testPayload: {
                //this test will iterate over all possible registers of the word e.g. JOGO and Jogo will be tested as well
                allRegisters: true,

                input: `Україна`,

                expected: `Ukrajina`

            }
        }
    ]
}


export { cyrToLatTestSuite };