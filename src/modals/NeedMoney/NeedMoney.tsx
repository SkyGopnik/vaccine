import React from 'react';
import {
  ModalCard,
  Button,
  ModalPageHeader, ANDROID, IOS, usePlatform
} from "@vkontakte/vkui";

import img from 'src/img/NoMoney.png';

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
      header={`Не хватает ${props.modalData && props.modalData.need} вакцины`}
      subheader={<>
        <div>Вам не хватает вакцины для покупки.</div>
        <div>Посмотрите рекламу и получите вакцину бесплатно!</div>
      </>}
      actions={
        <Button size="m">
          Посмотреть
        </Button>
      }
      onClose={() => props.changeModal(null)}
    />
  );
};
