function testText(testName) {
    const tests = {
        'cyrillic1': `    В словах іншомовного походження м’який знак пишеться після м’яких д, т, з, с, л, н перед ї, йо, а також перед я, ю, є, які читаються як [йа], [йу], [йе]: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В'єнтьян.
    М’який знак не пишеться після б, п, в, м, ф, р, ж, ч, ш, щ: дріб, приголуб, сипте, степ, кров, вісім, верф, ніж, їж, знаєш, бачиш, піч, річ, борщ, морщ, воротар, гіркий, кобзар, перевір, тепер, Харків тощо. Виняток: Горький, трьох.
    В латинці правильно писати апостроф перед "йо"/"jo" після приголосних: серйозно (ser’jozno), курйоз (kur’joz), але район, мільйон.
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: "НЕ СПОВІЩАТИ" (але "Ще"), "ЮНЕСКО", СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН.
    Особливі випадки на 'йо': його, "йогурт", (Йоркшир), /йога/, [Йоганнесбург], \`Йовович\`, яйко, але "яйок" (jajok).`,
        'latin1': `        V slovah inšomovnogo pohodžennja m’jakyj znak pyšet'sja pislja m’jakyh d, t, z, s, l, n pered ji, ’jo, a takož pered ja, ju, je, jaki čytajut'sja jak [ja], [ju], [je]: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V’jent'jan.
    M’jakyj znak ne pyšet'sja pislja b, p, v, m, f, r, ž, č, š, šč: drib, prygolub, sypte, step, krov, visim, verf, niž, již, znaješ, bačyš, pič, rič, boršč, moršč, vorotar, girkyj, kobzar, perevir, teper, Harkiv toščo. Vynjatok: Gor'kyj, trjoh.
    V latynci pravyl'no pysaty apostrof pered "jo"/"jo" pislja prygolosnyh: ser’jozno (серйозно), kur’joz (серйозно), ale rajon, mil'jon.
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO".`
    }
    return tests[testName] ? tests[testName] : '';
}

export { testText }