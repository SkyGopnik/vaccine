module.exports = function ucFirst(str) {
  if (!str) return str;

  const newStr = str.trim();

  return newStr[0].toUpperCase() + newStr.slice(1);
};
