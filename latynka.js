function latynka(word) {
        var answer = '';
        var lowerCase = {
          'а': 'a',
          'б': 'b',
          'в': 'v',
          'г': 'g',
          'ґ': 'ĝ',
          'д': 'd',
          'е': 'e',
          'ж': 'ž',
          'з': 'z',
          'и': 'y',
          'і': 'i',
          'й': 'j',
          'к': 'k',
          'л': 'l',
          'м': 'm',
          'н': 'n',
          'о': 'o',
          'п': 'p',
          'р': 'r',
          'с': 's',
          'т': 't',
          'у': 'u',
          'ф': 'f',
          'х': 'h',
          'ц': 'c',
          'ч': 'č',
          'ш': 'š'
        };

        var upperCase = {
          'А': 'A',
          'Б': 'B',
          'В': 'V',
          'Г': 'G',
          'Ґ': 'Ĝ',
          'Д': 'D',
          'Е': 'E',
          'Ж': 'Ž',
          'З': 'Z',
          'И': 'Y',
          'І': 'I',
          'Й': 'J',
          'К': 'K',
          'Л': 'L',
          'М': 'M',
          'Н': 'N',
          'О': 'O',
          'П': 'P',
          'Р': 'R',
          'С': 'S',
          'Т': 'T',
          'У': 'U',
          'Ф': 'F',
          'Х': 'H',
          'Ц': 'C',
          'Ч': 'Č',
          'Ш': 'Š',
        };

        var digraphs = {
          //ё
          'йо': 'jo',
          'ьо': 'jo'
        };

        var reverseDigraphs = {
          'є': 'je',
          'ї': 'ji',
          'щ': 'šč',
          'ю': 'ju',
          'я': 'ja',
          'Є': 'Je',
          'Ї': 'Ji',
          'Щ': 'Šč',
          'Ю': 'Ju',
          'Я': 'Ja'
        };

        var upperCaseReverseDigraphs = {
          'Є': 'JE',
          'Ї': 'JI',
          'Щ': 'ŠČ',
          'Ю': 'JU',
          'Я': 'JA'
        };

        var special = {
          'Ь': '\'',
          'ь': '\'',
          '\'': '\''
        };

        var converter = {
          ...lowerCase,
          ...upperCase,
          ...reverseDigraphs,
          ...special,
          ...digraphs
        };

        function isUpperCaseReverseDigraph(word, i) {
          var previousIsUpperCase = i - 1 >= 0 && upperCase[word[i - 1]];
          var nextIsUpperCase = i + 1 < word.length && upperCase[word[i + 1]];
          var isAcronym = previousIsUpperCase || nextIsUpperCase;
          return upperCaseReverseDigraphs[word[i]] && isAcronym;
        }

        var i = 0;
        while (i < word.length) {
          if (converter[word[i]] == undefined) {
            answer += word[i];
            i++;
          } else {
            if (i + 1 < word.length) {
              var digraph = word[i] + word[i + 1];
              if (digraphs[digraph]) {
                answer += converter[digraph];
                i += 2;
              }
            }

            if (i < word.length && isUpperCaseReverseDigraph(word, i)) {
              answer += upperCaseReverseDigraphs[word[i]];
              i++;
            }

            if (i < word.length && converter[word[i]]) {
              answer += converter[word[i]];
              i++;
            }
          }
        }
        return answer;
      }

      $('#submitk').click(function() {
        $('#inputk').val(function(i, val) {
          return latynka(val);
        });
        return false;
      });
