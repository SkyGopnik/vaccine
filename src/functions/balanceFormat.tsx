import Decimal from 'decimal.js';

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

export function locale (balance: number, options?: object) {
  return new Decimal(balance).toNumber().toLocaleString('ru', options).replace(',', '.');
}
