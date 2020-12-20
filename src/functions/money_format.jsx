module.exports = function moneyFormat(price) {
  let result = '';
  if (typeof (price) !== 'undefined') {
    if (typeof (price) === 'number') {
      price = price.toString();
    }

    if (price.length > 0) {
      const testPrice = /^([\d]+)|([\d]+\.|,[\d]+)$/;
      if (testPrice.test(price)) {
        const regex = /\.|,[\d]+$/ig;
        const delimPos = price.search(regex);
        const blockSize = 3;

        let str;
        let integral;
        let decimal;

        if (delimPos >= 0) {
          integral = price.substr(0, delimPos);
          decimal = price.substr(delimPos + 1);
        } else {
          integral = price;
          decimal = '';
        }

        str = integral;
        if (str.length > blockSize) {
          while (str.length > 0) {
            if (str.length > blockSize) {
              result = ' ' + str.substr((blockSize * (-1)), blockSize) + result;
              str = str.substr(0, (str.length - blockSize));
            } else {
              result = str + result;
              str = '';
            }
          }
          result = decimal.length > 0 ? result + '.' + decimal : result;
        } else {
          result = str + (decimal.length > 0 ? '.' + decimal : '');
        }
      } else {
        result = price;
      }
    }
  }

  return result;
};
