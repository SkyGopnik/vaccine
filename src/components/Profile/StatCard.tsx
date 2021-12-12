import React from "react";
import Decimal from "decimal.js";
import {Subhead} from "@vkontakte/vkui";

import Card from "src/components/Card/Card";

import {locale} from "src/functions/balanceFormat";
import getDate from "src/functions/getDate";
import isObjectNull from "src/functions/isObjectNull";

import {UserStat} from "src/store/profile/reducers";

import Img5 from "src/img/profile/5.svg";

interface IProps {
  stat: UserStat
}

export default class extends React.Component<IProps, any>{

  constructor(props) {
    super(props);
  }

  render() {
    const { stat } = this.props;

    if (isObjectNull(stat)) {
      return null;
    }

    const todayTransferLimit = Math.pow(2, stat.level);
    const transferSumToday = new Decimal(todayTransferLimit).minus(stat.transferSumToday).toNumber();

    return (
      <Card
        icon={<img src={Img5} alt="" />}
        title="Статистика"
      >
        <Subhead weight="regular">
          <div>· Уровень: {stat.level ? locale(stat.level) : 0}</div>
          {stat.level <= 5 && (
            <div>· Дневной лимит на получение: {stat.level ? locale(todayTransferLimit) : 0} (Осталось: {locale(transferSumToday)})</div>
          )}
          <div>· Начало разработки вакцины: {stat.startAt ? getDate(stat.startAt) : 0}</div>
          <div>· Разработано: {stat.record && locale(stat.record) || 0}</div>
          <div>· Получено вакцины: {stat.transfer && locale(stat.transfer) || 0}</div>
          <div>· Произведено улучшений: {stat.improvements && locale(stat.improvements) || 0}</div>
          {/*<div>· Достижений: {stat.achievements || 0}</div>*/}
        </Subhead>
      </Card>
    );
  }

}
