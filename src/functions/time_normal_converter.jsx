module.exports = function timeNormalConverter(timestamp) {
  const a = new Date(timestamp * 1000);

  let day;
  if (a.getDate() > 9) {
    day = a.getDate();
  } else {
    day = '0' + a.getDate();
  }

  let month;
  if ((a.getMonth() + 1) > 9) {
    month = (a.getMonth() + 1);
  } else {
    month = '0' + (a.getMonth() + 1);
  }

  const hour = a.getHours();
  let min;
  if (a.getMinutes() > 9) {
    min = a.getMinutes();
  } else {
    min = '0' + a.getMinutes();
  }

  const time = `${day}.${month}.${a.getFullYear()}г. в ${hour}:${min}`;
  return time;
};
