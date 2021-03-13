import Decimal from 'decimal.js';
import Utility from "src/utility";

export default function (balance: number, localeNeed: boolean = true) {
  if (!localeNeed) {
    return new Decimal(balance).toNumber().toFixed(4);
  }

  // console.log(balance);
  // console.log(Decimal(balance).toNumber())

  return new Decimal(balance).toNumber().toLocaleString('ru', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).replace(',', '.');
};

export function locale (balance: number) {
  const [whole, fractional] = Utility.noExponents(balance).split('.');

  return new Decimal(whole).toNumber().toLocaleString('ru') + (fractional ? `.${fractional}` : '');
}
