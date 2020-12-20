module.exports = function unixTime() {
  return Number(new Date().getTime() / 1000);
};
