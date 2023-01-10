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
    }
}

export { exceptions };