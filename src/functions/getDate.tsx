export default function (timestamp: Date) {
  const a = new Date(timestamp);
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  let min;
  if (a.getMinutes() > 9) {
    min = a.getMinutes();
  } else {
    min = '0' + a.getMinutes();
  }
  const time = date + ' ' + month + ' в ' + hour + ':' + min;
  return time;
};
