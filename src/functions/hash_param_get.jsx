module.exports = function getParmFromHash(param) {
  const url = window.location.hash;
  const getParam = url.match(param + '=[0-9%a-zA-Zа-яА-Я]*', 'gm');

  let getValue = null;
  if (getParam !== null) {
    getValue = getParam[0].split('=');
  }

  let decodeValue = null;

  try {
    decodeValue = decodeURIComponent(getValue[1]);
  } catch (err) {
    console.log(err);
  }


  return getParam !== null ? decodeValue : null;
};
