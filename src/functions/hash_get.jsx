module.exports = function hashGet(key) {
  let p = window.location.hash;
  p = p.match(new RegExp(key + '=([^&=]+)'));
  return p ? p[1] : false;
};
