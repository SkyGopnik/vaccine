export const improvements: {
  [key: string]: Array<{
    name: string,
    desc: string,
    price: number,
    count: number,
    icon: string,
    pref: string
  }>
} = {
  "vaccine": [
    {
      name: "Вода",
      desc: "Обычная вода из-под крана, ничем не примечательная",
      price: 0.005,
      count: 0.0001,
      icon: "https://i.imgur.com/B7JjUAv.png",
      pref: "клик"
    },
    {
      name: "Мыло",
      desc: "Сильно пузырится, но зато эффективное",
      price: 10,
      count: 0.0003,
      icon: "https://i.imgur.com/MqVkhqx.png",
      pref: "клик"
    },
    {
      name: "Салфетки",
      desc: "Бумажные и мягкие, что может быть лучше?",
      price: 50,
      count: 0.0015,
      icon: "https://i.imgur.com/jHHTDqr.png",
      pref: "клик"
    },
    {
      name: "Бинт",
      desc: "А что если стать мумией?",
      price: 200,
      count: 0.03,
      icon: "https://i.imgur.com/1qk3aiw.png",
      pref: "клик"
    },
    {
      name: "Бадяга",
      desc: "Была куплена на рынке, кто его знает, что там вообще",
      price: 500,
      count: 0.05,
      icon: "https://i.imgur.com/hmR2Lgr.png",
      pref: "клик"
    },
    {
      name: "Настойка",
      desc: "Найдена в урне, можно рискнуть",
      price: 1500,
      count: 0.1,
      icon: "https://i.imgur.com/ZKfMBUc.png",
      pref: "клик"
    },
    {
      name: "Антисептик",
      desc: "Самый лёгкий способ для борьбы с вирусом",
      price: 10000,
      count: 0.5,
      icon: "https://i.imgur.com/M8oMX5M.png",
      pref: "клик"
    },
    {
      name: "Перчатки",
      desc: "Трогай всё что угодно, только не забывай менять",
      price: 25000,
      count: 1,
      icon: "https://i.imgur.com/9qOdQLu.png",
      pref: "клик"
    },
    {
      name: "Маска",
      desc: "Нелегально украденная из аптеки, всё ещё пахнет больницей",
      price: 100000,
      count: 3,
      icon: "https://i.imgur.com/08pvhsH.png",
      pref: "клик"
    },
    {
      name: "Таблетки",
      desc: "Разноцветные малышки",
      price: 300000,
      count: 5,
      icon: "https://i.imgur.com/iO23FSD.png",
      pref: "клик"
    },
    {
      name: "Дезинфекция",
      desc: "Почти так же, как сходить в душ, но за деньги",
      price: 700000,
      count: 10,
      icon: "https://i.imgur.com/RIab9BB.png",
      pref: "клик"
    },
    {
      name: "Чай",
      desc: "Поможет укрепить организм",
      price: 1000000,
      count: 15,
      icon: "https://i.imgur.com/VIlL2UL.png",
      pref: "клик"
    },
    {
      name: "Мамин супчик",
      desc: "Вкусный и такой родной - лучшее, что сегодня можно найти",
      price: 2000000,
      count: 25,
      icon: "https://i.imgur.com/0D7WP6t.png",
      pref: "клик"
    },
    {
      name: "Джет",
      desc: "Методом тыка выяснилось, что он ускоряет работу мозга",
      price: 5000000,
      count: 50,
      icon: "https://i.imgur.com/lfh3dCi.png",
      pref: "клик"
    },
    {
      name: "Костюм",
      desc: "Самый эффективный способ борьбы, но супчик кушать сложно",
      price: 15000000,
      count: 100,
      icon: "https://i.imgur.com/d1kj5D9.png",
      pref: "клик"
    }
  ],
  "scientists": [
    {
      name: "Первый шаг",
      desc: "Вирус ещё слишком силён, и мы не понимаем, что делать дальше",
      price: 0.05,
      count: 0.0001,
      icon: "https://i.imgur.com/7XIQtoD.png",
      pref: "сек"
    },
    {
      name: "Проверки на улице",
      desc: "Возможно, проверка населения к чему-то приведет",
      price: 25,
      count: 0.0003,
      icon: "https://i.imgur.com/FWOKJag.png",
      pref: "сек"
    },
    {
      name: "Лаборатория",
      desc: "Пока что она в гараже, но, возможно, дальше будет лучше",
      price: 50,
      count: 0.0015,
      icon: "https://i.imgur.com/XEkVIV3.png",
      pref: "сек"
    },
    {
      name: "Новая возможность",
      desc: "Достигнув определённого прогресса, мы можем немного ускориться, но расслабляться нельзя",
      price: 150,
      count: 0.03,
      icon: "https://i.imgur.com/vKS37S0.png",
      pref: "сек"
    },
    {
      name: "Сажаем на карантин",
      desc: "В течение 14 дней люди находятся дома, это позволяет нам замедлить распространение вируса",
      price: 500,
      count: 0.05,
      icon: "https://i.imgur.com/mcMp1Qe.png",
      pref: "сек"
    },
    {
      name: "Подписка на фильмы и сериалы",
      desc: "Это может помочь сдержать людей дома",
      price: 1500,
      count: 0.1,
      icon: "https://i.imgur.com/2d5CuoU.png",
      pref: "сек"
    },
    {
      name: "Дезинфицируем предметы",
      desc: "Узнав, что вирус может передаваться через предметы, мы начинаем протирать их спиртом",
      price: 10000,
      count: 0.5,
      icon: "https://i.imgur.com/4Py5uwW.png",
      pref: "сек"
    },
    {
      name: "Строим больницы",
      desc: "Да, они низкого качества, но это лучше, чем ничего",
      price: 25000,
      count: 1,
      icon: "https://i.imgur.com/Axhan74.png",
      pref: "сек"
    },
    {
      name: "Волшебная пилюля",
      desc: "Один из наших врачей смешал мамин супчик и бадягу, получилась довольно вкусная и полезная пилюля",
      price: 100000,
      count: 3,
      icon: "https://i.imgur.com/4wxUvps.png",
      pref: "сек"
    },
    {
      name: "Удаление дезинформации",
      desc: "Нужно не допустить распространение ложной информации",
      price: 250000,
      count: 5,
      icon: "https://i.imgur.com/vu2opha.png",
      pref: "сек"
    },
    {
      name: "Закрытие города",
      desc: "Это решение было сложным, но, если оно поможет остановить вирус, мы готовы",
      price: 500000,
      count: 10,
      icon: "https://i.imgur.com/qPBerOw.png",
      pref: "сек"
    },
    {
      name: "Гуманитарные грузы",
      desc: "Ближайшие страны обещали нам помочь, попробуем обратиться к ним",
      price: 1000000,
      count: 15,
      icon: "https://i.imgur.com/Xd66gJX.png",
      pref: "сек"
    },
    {
      name: "Прототип вакцины",
      desc: "Люди пока нас боятся, но мы сможем их побороть",
      price: 2500000,
      count: 25,
      icon: "https://i.imgur.com/99GaveH.png",
      pref: "сек"
    }
  ],
  "pharmacy": []
};
