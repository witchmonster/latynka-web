import { latToCyr } from "../../../../main/js/converters/latToCyr.js";

// for tests:
// set optional: true if you want a test to fail with a WARNING (yellow) instead of an ERROR (red)

// for suites:
// by default any suite will propagate a WARNING (yellow) state if any of sub-tests/suites have WARNINGS
// set optional: true if you want suite to be SUCCEED (green) even if there were WARNINGS in tests or sub-suites
const latToCyrTestSuite = {
    name: `Versija 0.9 Latynka => Kyrylycja`,
    fn: latToCyr,
    optional: false,
    testPayload: [
        {
            name: `kontrol'nyj testovyj tekst`,
            optional: false,
            testPayload: {

                input: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V’jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered [jo] pislja prygolosnyh: ser’jozno, kur’joz, ale rajon, mil'jon.
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: NE SPOVIŠČATY (ale Šče), JUNESKO, SER’JOZNO, KUR’JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na [jo]/(m'jakyj znak + o): p’jatjoh, trjoh, jogo, jogurt, (Jorkšyr), /joga/, Jogannesburg, _Jovovyč_.`,

                expected: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед [йо] після приголосних: серйозно, курйоз, але район, мільйон.
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: НЕ СПОВІЩАТИ (але Ще), ЮНЕСКО, СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на [йо]/(м’який знак + о): п’ятьох, трьох, його, йогурт, (Йоркшир), /йога/, Йоганнесбург, _Йовович_.`

            }
        },
        {
            name: `"його" => "jogo" na počatku teksta, vsi registry`,
            optional: false,
            testPayload: {
                allRegisters: true,

                input: `jogo`,

                expected: `його`

            }
        },
        {
            name: `"його" => "jogo" na počatku teksta, vsi registry`,
            optional: false,
            testPayload: {
                allRegisters: true,

                input: `\r\njogo`,

                expected: `\r\nйого`

            }
        }
    ]
}

export { latToCyrTestSuite }