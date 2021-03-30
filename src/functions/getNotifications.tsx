import React, {ReactNode} from "react";

import declNum from "src/functions/decl_num";
import declBySex from "src/functions/declBySex";
import {locale} from "src/functions/balanceFormat";

import { UserInfoInterface } from "src/store/user/reducers";

export interface NotificationInterface {
  id: number,
  type: 'getTransferMoney' | 'sendTransferMoney' | 'getRefActivate' | 'refActivated' | 'getPromocode',
  additional: AdditionalInterface["getTransferMoney" |  "sendTransferMoney" | "getRefActivate" | "refActivated" | "getPromocode"],
  isNew: boolean,
  createdAt: Date,
  updatedAt: Date,
  userId: string
}

export interface RenderNotificationInterface {
  title: string,
  text: ReactNode,
  photo: string,
  isNew: boolean,
  isRepeat?: boolean,
  isProfileTitle: boolean,
  time: string,
  user?: UserInfoInterface
}

export interface AdditionalInterface {
  // Передал тебе...
  getTransferMoney: {
    sum: number,
    user: UserInfoInterface
  },
  // Получил ...
  sendTransferMoney: {
    sum: number,
    user: UserInfoInterface
  },
  // Получено {n} вакцины, за использование реферального кода
  getRefActivate: {
    sum: number,
    user: UserInfoInterface
  },
  // {name} использовал твой код, получено {n} вакцины
  refActivated: {
    sum: number,
    user: UserInfoInterface
  },
  // Получено {n} вакцины, за использование промокода
  getPromocode: {
    sum: number,
    user: UserInfoInterface
  }
}

const getTime = (_time: Date): string => {
  const months = ['Янв' , 'Фев' , 'Мар' , 'Апр' , 'Май' , 'Июнь' , 'Июль' , 'Авг' , 'Сен' , 'Окт' , 'Нояб' , 'Дек'];

  // Промежуточные для форматирования и сравнивания цифр
  const now = new Date();
  const time = new Date(_time);

  console.log(_time);
  console.log(time);
  console.log('----------');

  // Текущая дата в Unixtime
  const nowUnix = (now.getTime() / 1000);
  // Входящая дата в Unixtime
  const timeUnix = (time.getTime() / 1000);

  // Разница между временем в секундах
  const difference = Math.round(nowUnix - timeUnix);

  const minutes = Math.round(difference / 60); // Разница в минутах
  const hours = Math.round(minutes / 60);

  const formatNumber = (num: number) => {
    if (num < 10) {
      return '0' + num;
    }

    return num;
  }

  // Только что
  if (difference <= 0) {
    return 'только что';
  }

  // < 1 минуты
  if (difference < 60) {
    return `${difference} ${declNum(difference, ['секунду', 'секунды', 'секунд'])} назад`;
  }

  // < 1 часа
  if (difference < 3600) {
    return `${minutes} ${declNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
  }

  // < 5 часов
  if (difference < 18000) {
    return `${hours} ${declNum(hours, ['час', 'часа', 'часов'])} назад`;
  }

  // Сегодня
  if (time.getDate() === now.getDate()) {
    return `сегодня в ${time.getHours()}:${formatNumber(time.getMinutes())}`;
  }

  // Вчера
  if ((time.getDate() + 1) === now.getDate()) {
    return `вчера в ${time.getHours()}:${formatNumber(time.getMinutes())}`;
  }

  // Для всех остальных случаев - 1 мар в 16:53
  return `${time.getDate()} ${months[time.getMonth()].toLowerCase()} в ${time.getHours()}:${formatNumber(time.getMinutes())}`;
};

export default function (notification: NotificationInterface, lowText?: boolean): RenderNotificationInterface {
  const { type } = notification;

  const upperFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (type === 'getTransferMoney') {
    const additional: AdditionalInterface["getTransferMoney"] = notification.additional;
    const { sum } = additional;
    const { firstName, lastName, photo, sex } = additional.user;

    const action = declBySex(sex, ['передал(а)', 'передала', 'передал']);

    return {
      title: `${firstName} ${lastName}`,
      text: (
        <span>{!lowText ? upperFirstLetter(action) : action} тебе <span style={{ fontWeight: 500 }}>{locale(sum)}</span> {declNum(sum, ['вакцину', 'вакцины', 'вакцины'])}</span>
      ),
      photo,
      isNew: notification.isNew,
      isProfileTitle: true,
      time: getTime(notification.createdAt),
      user: additional.user
    };
  }

  if (type === 'sendTransferMoney') {
    const additional: AdditionalInterface["sendTransferMoney"] = notification.additional;
    const { sum } = additional;
    const { firstName, lastName, photo, sex } = additional.user;

    const action = declBySex(sex, ['получил(а)', 'получила', 'получил']);

    return {
      title: `${firstName} ${lastName}`,
      text: (
        <span>{!lowText ? upperFirstLetter(action) : action} <span style={{ fontWeight: 500 }}>{locale(sum)}</span> {declNum(sum, ['вакцину', 'вакцины', 'вакцины'])}</span>
      ),
      photo,
      isNew: notification.isNew,
      isProfileTitle: true,
      isRepeat: true,
      time: getTime(notification.createdAt),
      user: additional.user
    };
  }

  if (type === 'getRefActivate') {
    const additional: AdditionalInterface["getRefActivate"] = notification.additional;
    const {sum} = additional;
    const { firstName, lastName, photo } = additional.user;

    return {
      title: `${firstName} ${lastName}`,
      text: (
        <span>Получено <span style={{fontWeight: 500}}>{locale(sum)}</span> вакцины, за использование реферального кода</span>
      ),
      photo,
      isNew: notification.isNew,
      isProfileTitle: false,
      time: getTime(notification.createdAt),
      user: additional.user
    };
  }

  if (type === 'refActivated') {
    const additional: AdditionalInterface["refActivated"] = notification.additional;
    const {sum} = additional;
    const { firstName, lastName, photo, sex } = additional.user;

    const action = declBySex(sex, ['использовал(а)', 'использовала', 'использовал']);

    return {
      title: `${firstName} ${lastName}`,
      text: (
        <span>{!lowText ? upperFirstLetter(action) : action} твой реферальный код, получено <span style={{fontWeight: 500}}>{locale(sum)}</span> вакцины</span>
      ),
      photo,
      isNew: notification.isNew,
      isProfileTitle: true,
      time: getTime(notification.createdAt),
      user: additional.user
    };
  }

  if (type === 'getPromocode') {
    const additional: AdditionalInterface["getPromocode"] = notification.additional;
    const {sum} = additional;
    const {firstName, lastName, photo} = additional.user;

    return {
      title: `${firstName} ${lastName}`,
      text: (
        <span>Получено <span style={{fontWeight: 500}}>{locale(sum)}</span> вакцины, за использование промокода</span>
      ),
      photo,
      isNew: notification.isNew,
      isProfileTitle: false,
      time: getTime(notification.createdAt),
      user: additional.user
    };
  }
};
