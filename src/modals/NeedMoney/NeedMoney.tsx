import React from 'react';
import Decimal from 'decimal.js';
import {
  ModalCard,
  Button
} from "@vkontakte/vkui";

import img from 'src/img/NoMoney.png';
import declNum from "src/functions/decl_num";

interface IProps {
  id: string,
  modalData: {
    need: number
  },
  changeModal(modal: string | null, modalData?: Object)
}

export default (props: IProps) => {
  return (
    <ModalCard
      icon={<img src={img} alt="" />}
      header={`Не хватает ${props.modalData && (props.modalData.need > 1 ? Math.round(props.modalData.need) : props.modalData.need)} ${declNum(Math.round(props.modalData.need), ['вакцины', 'вакцины', 'вакцин'])}!`}
      subheader={<>
        <div>Вам не хватает вакцины для покупки.</div>
        <div>Посмотрите рекламу и получите вакцину бесплатно!</div>
      </>}
      actions={
        <Button size="l">
          Посмотреть
        </Button>
      }
      onClose={() => window.history.back()}
    />
  );
};
