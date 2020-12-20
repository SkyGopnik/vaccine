const isset = require('./isset.jsx');

module.exports = function definePlatform(platform) {
  const platforms = {
    mobile_android: 'Android',
    mobile_iphone: 'iPhone',
    mobile_web: 'Мобильный Web',
    desktop_web: 'ПК Web',
    mobile_android_messenger: 'Me Android',
    mobile_iphone_messenger: 'Me iPhone'
  };

  return isset(platforms[platform]) ? platforms[platform] : 'Прочие';
};
