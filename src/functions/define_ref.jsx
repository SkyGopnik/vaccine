const isset = require('./isset.jsx');

module.exports = function defineRef(ref) {
  const refs = {
    catalog: 'Открыт из списка приложений или из списка категорий в каталоге',
    catalog_popular: 'Список популярных приложений в каталоге',
    featuring_discover: 'Переход из дискавери выдачи',
    featuring_menu: 'Переход из меню',
    featuring_new: 'Переход из раздела фичеринга во второй вкладке мобильного клиента',
    group_menu: 'Переход из меню сообщества',
    home_screen: 'Запуск с главного экрана устройства',
    left_nav: 'Переход из левого меню на вебе',
    quick_search: 'Результаты быстрого поиска',
    super_app: 'Переход из виджета Мини-приложения',
    catalog_recent: 'Переход из последних'
  };

  return isset(refs[ref]) ? refs[ref] : 'Прочие переходы';
};
