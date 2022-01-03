export default function queryGet(key) {
  const search = window.location.search;
  const math = search.match(new RegExp(key + '=([^&=]+)'));

  return math ? math[1] : "";
};
