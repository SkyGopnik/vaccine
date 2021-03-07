import React from 'react';
import Decimal from 'decimal.js';
import {
  ModalCard,
  Button
} from "@vkontakte/vkui";

import declNum from "src/functions/decl_num";

import Nomoney from "src/components/Icons/Nomoney";

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
      icon={<Nomoney />}
      header={`Не хватает ${props.modalData && (props.modalData.need > 1 ? Math.round(props.modalData.need) : props.modalData.need.toFixed(4))} вакцины!`}
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
