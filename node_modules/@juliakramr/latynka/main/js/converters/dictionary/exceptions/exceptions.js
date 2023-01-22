const exceptions = {
    cyrToLat: {
        maxLength: 4,
        4: {
            '\"ьо\"': '\"\'o\"',
        },
        '"': {
            '\"ьо\"': '\"\'o\"'
        },
        'р': {
            'русск': 'moskal\'sk',
            'російськ': 'moskal\'s\'k'
        }
    },
    latToCyr: {
        maxLength: 12,
        3: {
            'Rjo': 'Рьо',
        },
        4: {
            //todo fix ''
            '’jo’': '\'йо\''
        },
        5: {
            'ad\'je': 'адьє',
            'trjoh': 'трьох',
        },
        6: {
            'Got\'je': 'Готьє',
            'N\'jasa': 'Ньяса',
            'Ren\'je': 'Реньє'
        },
        7: {
            'atel\'je': 'ательє',
            'kon\'jak': 'коньяк',
            'N\'juton': 'Ньютон',
            'mil\'jon': 'мільйон',
            'MIL\'JON': 'МІЛЬЙОН',
            //todo fix rule 'jo
            'kan\'jon': 'каньйон'
        },
        8: {
            'pas\'jans': 'пасьянс',
            'čotyrjoh': 'чотирьох',
            'mil\'jard': 'мільярд'
        },
        9: {
            'barel\'jef': 'барельєф',
            'vin\'jetka': 'віньєтка',
            'N\'ju-Jork': 'Нью-Йорк',
            //todo fix rule 'jo
            'batal\'jon': 'батальйон'
        },
        10: {
            'monpans\'je': 'монпансьє',
            'V’jent\'jan': 'В’єнтьян',
            'V\'jent\'jan': 'В’єнтьян',
        },
        11: {
            'buton\'jerka': 'бутоньєрка'
        },
        12: {
            'konferans\'je': 'конферансьє',
        }
    }

}

export { exceptions };