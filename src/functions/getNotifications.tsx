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
  additional: AdditionalInterface["getTransferMoney"],
  isNew: boolean,
  createdAt: Date,
  updatedAt: Date,
  userId: string
}

export interface AdditionalInterface {
  getTransferMoney: {
    sum: number,
    user: UserInfoInterface
  }
}

const getTime = (_time: Date): string => {
  const months = ['Янв' , 'Фев' , 'Мар' , 'Апр' , 'Май' , 'Июнь' , 'Июль' , 'Авг' , 'Сен' , 'Окт' , 'Нояб' , 'Дек'];

  // Текущая дата в Unixtime
  const now = (new Date().getTime() / 1000);
  // Входящая дата в Unixtime
  const time = (new Date(_time).getTime() / 1000);

  // Промежуточная для форматирования цифр
  const t = new Date(_time);

  // Разница между временем в секундах
  const difference = Math.round(now - time);

  // < 1 минуты
  if (difference < 60) {
    return `${difference} ${declNum(difference, ['секунду', 'секунды', 'секунд'])} назад`;
  }

  // < 1 часа
  if (difference < 3600) {
    return `${difference} ${declNum(difference, ['минуту', 'минуты', 'минут'])} назад`;
  }

  // < 5 часов
  if (difference < 18000) {
    return `${difference} ${declNum(difference, ['час', 'часа', 'часов'])} назад`;
  }

  // Сегодня
  if (difference < 86400) {
    return `сегодня в ${t.getHours()}:${t.getMinutes()}`;
  }

  // Вчера
  if (difference < 172800) {
    return `вчера в ${t.getHours()}:${t.getMinutes()}`;
  }

  // Для всех остальных случаев - 1 мар в 16:53
  return `${t.getDay()} ${months[t.getMonth()].toLowerCase()} в ${t.getHours()}:${t.getMinutes()}`;
};

export default function (notification: NotificationInterface, lowText?: boolean): {
  title: string,
  text: ReactNode,
  photo: string,
  isNew: boolean,
  time: string
} {
  const { type } = notification;

  if (type === 'getTransferMoney') {
    const additional: AdditionalInterface["getTransferMoney"] = notification.additional;
    const { sum } = additional;
    const { firstName, lastName, photo } = additional.user;

    return {
      title: `${firstName} ${lastName}`,
      text: (
        <span>{!lowText ? 'Передал' : 'передал'} тебе <span style={{ fontWeight: 500 }}>{locale(sum)}</span> вакцины</span>
      ),
      photo,
      isNew: notification.isNew,
      time: getTime(notification.createdAt)
    };
  }
};
