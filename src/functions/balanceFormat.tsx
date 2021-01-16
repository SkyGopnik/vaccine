export default function (balance: number) {
  if (balance.toString().split('.').length === 2) {
    return balance.toLocaleString();
  }

  return `${balance.toLocaleString()},0`;
};
