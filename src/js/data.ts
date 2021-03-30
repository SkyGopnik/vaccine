import Img1 from "src/img/tasks/1.svg";
import Img2 from "src/img/tasks/2.svg";
import Img3 from "src/img/tasks/3.svg";
import Img4 from "src/img/tasks/4.svg";
import Img5 from "src/img/tasks/5.svg";

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
      price: 0.5,
      count: 0.001,
      icon: "https://i.imgur.com/MqVkhqx.png",
      pref: "клик"
    },
    {
      name: "Салфетки",
      desc: "Бумажные и мягкие, что может быть лучше?",
      price: 10,
      count: 0.1,
      icon: "https://i.imgur.com/jHHTDqr.png",
      pref: "клик"
    },
    {
      name: "Бадяга",
      desc: "Была куплена на рынке, кто его знает, что там вообще",
      price: 100,
      count: 0.5,
      icon: "https://i.imgur.com/hmR2Lgr.png",
      pref: "клик"
    },
    {
      name: "Антисептик",
      desc: "Самый лёгкий способ для борьбы с вирусом",
      price: 500,
      count: 1,
      icon: "https://i.imgur.com/M8oMX5M.png",
      pref: "клик"
    },
    {
      name: "Перчатки",
      desc: "Трогай всё что угодно, только не забывай менять",
      price: 1000,
      count: 1.5,
      icon: "https://i.imgur.com/9qOdQLu.png",
      pref: "клик"
    },
    {
      name: "Маска",
      desc: "Нелегально украденная из аптеки, всё ещё пахнет больницей",
      price: 5000,
      count: 3,
      icon: "https://i.imgur.com/08pvhsH.png",
      pref: "клик"
    },
    {
      name: "Дезинфекция",
      desc: "Почти так же, как сходить в душ, но за деньги",
      price: 10000,
      count: 5,
      icon: "https://i.imgur.com/RIab9BB.png",
      pref: "клик"
    },
    {
      name: "Мамин супчик",
      desc: "Вкусный и такой родной - лучшее, что сегодня можно найти",
      price: 50000,
      count: 10,
      icon: "https://i.imgur.com/0D7WP6t.png",
      pref: "клик"
    },
    {
      name: "Костюм",
      desc: "Самый эффективный способ борьбы, но супчик кушать сложно",
      price: 100000,
      count: 15,
      icon: "https://i.imgur.com/d1kj5D9.png",
      pref: "клик"
    }
  ],
  "scientists": [
    {
      name: "Первый шаг",
      desc: "Вирус ещё слишком силён, и мы не понимаем, что делать дальше",
      price: 0.001,
      count: 0.0001,
      icon: "https://i.imgur.com/7XIQtoD.png",
      pref: "сек"
    },
    {
      name: "Лаборатория",
      desc: "Пока что она в гараже, но, возможно, дальше будет лучше",
      price: 0.1,
      count: 0.001,
      icon: "https://i.imgur.com/XEkVIV3.png",
      pref: "сек"
    },
    {
      name: "Новая возможность",
      desc: "Достигнув определённого прогресса, мы можем немного ускориться, но расслабляться нельзя",
      price: 5,
      count: 0.1,
      icon: "https://i.imgur.com/vKS37S0.png",
      pref: "сек"
    },
    {
      name: "Сажаем на карантин",
      desc: "В течение 14 дней люди находятся дома, это позволяет нам замедлить распространение вируса",
      price: 500,
      count: 0.5,
      icon: "https://i.imgur.com/mcMp1Qe.png",
      pref: "сек"
    },
    {
      name: "Дезинфицируем предметы",
      desc: "Узнав, что вирус может передаваться через предметы, мы начинаем протирать их спиртом",
      price: 1000,
      count: 1,
      icon: "https://i.imgur.com/4Py5uwW.png",
      pref: "сек"
    },
    {
      name: "Строим больницы",
      desc: "Да, они низкого качества, но это лучше, чем ничего",
      price: 3000,
      count: 3,
      icon: "https://i.imgur.com/Axhan74.png",
      pref: "сек"
    },
    {
      name: "Волшебная пилюля",
      desc: "Один из наших врачей смешал мамин супчик и бадягу, получилась довольно вкусная и полезная пилюля",
      price: 5000,
      count: 5,
      icon: "https://i.imgur.com/4wxUvps.png",
      pref: "сек"
    },
    {
      name: "Закрытие города",
      desc: "Это решение было сложным, но, если оно поможет остановить вирус, мы готовы",
      price: 50000,
      count: 15,
      icon: "https://i.imgur.com/qPBerOw.png",
      pref: "сек"
    }
  ],
  "pharmacy": []
};
 
export const tasks: {
  [key: string]: Array<{
    name: string,
    desc: string,
    icon: string,
  }>
} = {
  "tasks": [
    {
      name: "Посмотреть рекламу",
      desc: "+500 вакцины",
      icon: Img1,
    },
    {
      name: "Подписаться на нас",
      desc: "+1000 вакцины",
      icon: Img2,
    },
    {
      name: "Включить уведомления",
      desc: "+1000 вакцины",
      icon: Img3,
    },
    {
      name: "Поделиться приложением",
      desc: "+1000 вакцины",
      icon: Img4,
    },
    {
      name: "Пригласить друзей",
      desc: "+2000 вакцины за одного друга",
      icon: Img5,
    }
  ]
};
