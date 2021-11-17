import Decimal from 'decimal.js';
import Utility from "src/utility";

export default function (balance: number, localeNeed: boolean = true) {
  if (!balance) {
    return "0";
  }

  if (!localeNeed) {
    return new Decimal(balance).toNumber().toFixed(4);
  }

  return new Decimal(balance).toNumber().toLocaleString('ru', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).replace(',', '.');
};

export function locale (balance: number) {
  const [whole, fractional] = Number(Utility.noExponents(balance)).toFixed(4).split('.');

  return new Decimal(whole).toNumber().toLocaleString('ru') + (fractional && fractional.replace(/0*$/,"") !== "" ? `.${fractional.replace(/0*$/,"")}` : '');
}
