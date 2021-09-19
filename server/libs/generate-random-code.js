const alpha_chars_lower = 'abcdefghijkemnopqrstuvwxyz';
const alpha_chars_upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums_only = '0123456789'
const alpha_chars = `${alpha_chars_lower}${alpha_chars_upper}`;
const alpha_nums = `${nums_only}${alpha_chars}`; 

const types = {
    'an': alpha_nums,
    'al': alpha_chars_lower,
    'au': alpha_chars_upper,
    'nu': nums_only
}
 
const randomDigit = length => {
    const num = Math.floor(Math.random() * Math.pow(10, 2));

    if(num > length) {
        if((99 - num) > length){
            return num % length;
        }else{
            return 99 - num
        }
    }
    return num;
}

/**
 * 
 * @param {number} length 
 * @returns 
 */
const generateCodeOfLenth = async (length, type = 'an') => {
    if(!Object.keys(types).includes(type)){
        throw TypeError(`The argument (${type}) dose not match any type. it should be one of this (${Object.keys(types)})`);
    }

    let apiKey = '';
    const codeType = types[type];
    const len = codeType.length - 1;

    while (apiKey.length < length) {
        apiKey += codeType[randomDigit(len)];
    }

    return apiKey;
}

module.exports = generateCodeOfLenth;