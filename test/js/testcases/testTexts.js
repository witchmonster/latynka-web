const texts = {
    'cyrillic_input1': `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед "йо" після приголосних: серйозно, курйоз, але район, мільйон (або міл\`йон?).
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: "НЕ СПОВІЩАТИ" (але "Ще"), "ЮНЕСКО", СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на "йо"/"ьо" (м'який знак + "о"): п’ятьох, трьох, його, "йогурт", (Йоркшир), /йога/, [Йоганнесбург], _Йовович_.`,

    'cyrillic_output1': `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V'jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered "jo" pislja prygolosnyh: ser’jozno, kur’joz, ale rajon, mil'jon (abo mil'jon?).
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO", SER’JOZNO, KUR’JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na "jo"/"jo" (m'jakyj znak + "o"): p'jatjoh, trjoh, jogo, "jogurt", (Jorkšyr), /joga/, [Jogannesburg], _Jovovyč_.`,

    'latin_input1': `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V’jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered "jo" pislja prygolosnyh: ser’jozno, kur’joz, ale rajon, mil'jon.
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO", SER’JOZNO, KUR’JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na "jo" (m'jakyj znak + "o"): p’jatjoh, trjoh, jogo, "jogurt", (Jorkšyr), /joga/, [Jogannesburg], _Jovovyč_.`,

    'latin_output1': `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед "йо" після приголосних: серйозно, курйоз, але район, мільйон.
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: "НЕ СПОВІЩАТИ" (але "Ще"), "ЮНЕСКО", СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на "йо" (м'який знак + "о"): п'ятьох, трьох, його, "йогурт", (Йоркшир), /йога/, [Йоганнесбург], _Йовович_.`,

    'all apostrophes outside words input': `
    ' 0x0027
    ʼ 0x02BC
    ’ 0x2019
    \` 0x0060
    ՚ 0x055A
    ＇ 0xFF07
    ‘ 0x2018
    ʹ 0x02B9
    ꞌ 0xA78C`,

    'all apostrophes outside words output': `
    ' 0x0027
    ʼ 0x02BC
    ’ 0x2019
    \` 0x0060
    ՚ 0x055A
    ＇ 0xFF07
    ‘ 0x2018
    ʹ 0x02B9
    ꞌ 0xA78C`,

    'all apostrophes inside words input': `
    м'який 0x0027 APOSTROPHE
    мʼякий 0x02BC MODIFIER LETTER APOSTROPHE
    м՚який 0x055A ARMENIAN APOSTROPHE
    м＇який 0xFF07 FULLWIDTH APOSTROPHE
    м’який 0x2019 RIGHT SINGLE QUOTATION MARK
    м\`який 0x0060 GRAVE ACCENT
    м\‘який 0x2018 LEFT SINGLE QUOTATION MARK
    мʹякий 0x02B9 MODIFIER LETTER PRIME
    мꞌякий 0xA78C LATIN SMALL LETTER SALTILLO`,

    'all apostrophes inside words output': `
    m'jakyj 0x0027 APOSTROPHE
    m'jakyj 0x02BC MODIFIER LETTER APOSTROPHE
    m'jakyj 0x055A ARMENIAN APOSTROPHE
    m'jakyj 0xFF07 FULLWIDTH APOSTROPHE
    m'jakyj 0x2019 RIGHT SINGLE QUOTATION MARK
    m'jakyj 0x0060 GRAVE ACCENT
    m'jakyj 0x2018 LEFT SINGLE QUOTATION MARK
    m'jakyj 0x02B9 MODIFIER LETTER PRIME
    m'jakyj 0xA78C LATIN SMALL LETTER SALTILLO`,

    'all apostrophes at the end of words input': `
    latyn' 0x0027 APOSTROPHE
    latynʼ 0x02BC MODIFIER LETTER APOSTROPHE
    latyn՚ 0x055A ARMENIAN APOSTROPHE
    latyn＇ 0xFF07 FULLWIDTH APOSTROPHE
    latyn’ 0x2019 RIGHT SINGLE QUOTATION MARK
    latyn\` 0x0060 GRAVE ACCENT
    latyn‘ 0x2018 LEFT SINGLE QUOTATION MARK
    latynʹ 0x02B9 MODIFIER LETTER PRIME
    latynꞌ 0xA78C LATIN SMALL LETTER SALTILLO`,

    'all apostrophes at the end of words output': `
    latyn' 0x0027 APOSTROPHE
    latyn' 0x02BC MODIFIER LETTER APOSTROPHE
    latyn' 0x055A ARMENIAN APOSTROPHE
    latyn' 0xFF07 FULLWIDTH APOSTROPHE
    latyn' 0x2019 RIGHT SINGLE QUOTATION MARK
    latyn' 0x0060 GRAVE ACCENT
    latyn' 0x2018 LEFT SINGLE QUOTATION MARK
    latyn' 0x02B9 MODIFIER LETTER PRIME
    latyn' 0xA78C LATIN SMALL LETTER SALTILLO`
}

function testText(testName) {
    return texts[testName] ? texts[testName] : '';
}

export { testText }