const
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g],
    convertPersianDigitToEnglish = function (str) {
        if (typeof str === 'string') {
            for (var i = 0; i < 10; i++) {
                str = str.replace(persianNumbers[i], i).replace(englishNumbers[i], i);
            }
        }
        return str;
    },
    convertEnglishDigitToPersian = function (str) {
        if (typeof str === 'string') {
            for (var i = 0; i < 10; i++) {
                str = str.replace(englishNumbers[i], i).replace(persianNumbers[i], i);
            }
        }
        return str;
    };

const toPersianDigits = function (value) {
    var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return value.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};

const toEnglishDigits = function (value) {
    var id = {'۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'};
    return value.replace(/[^0-9.]/g, function (w) {
        return id[w] || w;
    });
};
export const formatNumber = (input) => {
    let inputVal = '';
    let formattedNumber;
    if (input === 0) {
        inputVal = ''
    }
    if (input !== 0) {
        inputVal = input
    }
    if (typeof inputVal === "string") {
        const numericInput = inputVal?.replace(/[^0-9]/g, '');
        formattedNumber = Number(numericInput).toLocaleString();
    } else {
        formattedNumber = Number(inputVal).toLocaleString();
    }
    return formattedNumber;
};

const GlobalFunctions = {
    convertPersianDigitToEnglish: convertPersianDigitToEnglish,
    convertEnglishDigitToPersian: convertEnglishDigitToPersian,
    formatNumber,
    toPersianDigits: toPersianDigits,
    toEnglishDigits: toEnglishDigits
};

export default GlobalFunctions;
