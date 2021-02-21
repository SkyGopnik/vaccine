import Decimal from 'decimal';

export default function (balance: number, localeNeed: boolean = true) {
  if (!localeNeed) {
    return Decimal(balance).toNumber().toFixed(4);
  }

  return Decimal(balance).toNumber().toLocaleString('ru', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).replace(',', '.');
};

export function locale (balance: number) {
  return balance.toLocaleString('ru').replace(',', '.');
}
