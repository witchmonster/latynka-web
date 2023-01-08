const texts = {
    cyrToLatTest1: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед "йо" після приголосних: серйозно, курйоз, але район, мільйон (або міл\`йон?).
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: "НЕ СПОВІЩАТИ" (але "Ще"), "ЮНЕСКО", СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на "йо"/"ьо" (м'який знак + "о"): п’ятьох, трьох, його, "йогурт", (Йоркшир), /йога/, [Йоганнесбург], _Йовович_.`,


    latToCyrTest1: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V’jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered "jo" pislja prygolosnyh: ser’jozno, kur’joz, ale rajon, mil'jon.
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO", SER’JOZNO, KUR’JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na "jo" (m'jakyj znak + "o"): p’jatjoh, trjoh, jogo, "jogurt", (Jorkšyr), /joga/, [Jogannesburg], _Jovovyč_.`,

    cyrToLatUvaga: `
    Увага! Це тестова версія. Про помилки та баги пишіть <a href="https://github.com/jkramr/latynka/issues/new">Сюди</a>.
    
    Наразі слова, написані болгарською та іншими мовами,  також перекладатимуться латинкою: Черноризец Храбър => Černoryzec Hrabъr. Аби запобігти перекладу слова, ви можете загорнути потрібне слово або речення подвійним знаком "@": 
    @@Черноризец Храбър@@ => Черноризец Храбър`,

    latToCyrUvaga: `
    Увага! Це тестова версія. Про помилки та баги пишіть <a href="https://github.com/jkramr/latynka/issues/new">Сюди</a>.

    Наразі слова, написані англійською та іншими мовами також перекладатимуться кирилицею: New York => Неw Иорк. Аби запобігти перекладу слова, ви можете загорнути потрібне слово або речення подвійним знаком "@": @@New York@@ => New York`,

}

function getText(testName) {
    return texts[testName];
}

export { texts, getText } 