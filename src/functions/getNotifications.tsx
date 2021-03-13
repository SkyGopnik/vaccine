import React, {ReactNode} from "react";

import declNum from "src/functions/decl_num";
import {locale} from "src/functions/balanceFormat";

import { UserInfoInterface } from "src/store/user/reducers";
/*
  getTransferMoney - уведомление, когда тебе перевели деньги
 */

export interface NotificationInterface {
  id: number,
  type: 'getTransferMoney',
  additional: AdditionalInterface["getTransferMoney"] | AdditionalInterface["sendTransferMoney"],
  isNew: boolean,
  createdAt: Date,
  updatedAt: Date,
  userId: string
}

export interface AdditionalInterface {
  getTransferMoney: {
    sum: number,
    user: UserInfoInterface
  },
  sendTransferMoney: {
    sum: number,
    user: UserInfoInterface
  }
}

const getTime = (_time: Date): string => {
  const months = ['Янв' , 'Фев' , 'Мар' , 'Апр' , 'Май' , 'Июнь' , 'Июль' , 'Авг' , 'Сен' , 'Окт' , 'Нояб' , 'Дек'];

  // Промежуточные для форматирования и сравнивания цифр
  const now = new Date();
  const time = new Date(_time);

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
  if (difference === 0) {
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
  if (time.getDay() === now.getDay()) {
    return `сегодня в ${time.getHours()}:${formatNumber(time.getMinutes())}`;
  }

  // Вчера
  if ((time.getDay() + 1) === now.getDay()) {
    return `вчера в ${time.getHours()}:${formatNumber(time.getMinutes())}`;
  }

  // Для всех остальных случаев - 1 мар в 16:53
  return `${time.getDay()} ${months[time.getMonth()].toLowerCase()} в ${time.getHours()}:${formatNumber(time.getMinutes())}`;
};

export default function (notification: NotificationInterface, lowText?: boolean): {
  title: string,
  text: ReactNode,
  photo: string,
  isNew: boolean,
  isRepeat?: boolean,
  time: string,
  user?: UserInfoInterface
} {
  const { type } = notification;

  if (type === 'getTransferMoney') {
    const additional: AdditionalInterface["getTransferMoney"] = notification.additional;
    const { sum } = additional;
    const { firstName, lastName, photo } = additional.user;

    return {
      title: `${firstName} ${lastName}`,
      text: (
        <span>{!lowText ? 'Передал' : 'передал'} тебе <span style={{ fontWeight: 500 }}>{locale(sum)}</span> {declNum(sum, ['вакцину', 'вакцины', 'вакцины'])}</span>
      ),
      photo,
      isNew: notification.isNew,
      time: getTime(notification.createdAt),
      user: additional.user
    };
  }

  if (type === 'sendTransferMoney') {
    const additional: AdditionalInterface["sendTransferMoney"] = notification.additional;
    const { sum } = additional;
    const { firstName, lastName, photo } = additional.user;

    return {
      title: `${firstName} ${lastName}`,
      text: (
        <span>{!lowText ? 'Получил' : 'получил'} <span style={{ fontWeight: 500 }}>{locale(sum)}</span> {declNum(sum, ['вакцину', 'вакцины', 'вакцины'])}</span>
      ),
      photo,
      isNew: notification.isNew,
      isRepeat: true,
      time: getTime(notification.createdAt),
      user: additional.user
    };
  }
};
