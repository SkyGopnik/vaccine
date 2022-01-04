import React from 'react';
import {
  ModalCard,
  Button
} from "@vkontakte/vkui";

import Nomoney from "src/components/Icons/Nomoney";

interface IProps {
  id: string,
  modalData: {
    need: number
  },
  changeModal(modal: string | null, modalData?: Object, isPopstate?: boolean),
  changePanel(panel: string)
}

export default (props: IProps) => {
  return (
    <ModalCard
      icon={<Nomoney />}
      header={`Не хватает ${props.modalData && (props.modalData.need > 1 ? Math.round(props.modalData.need) : props.modalData.need.toFixed(4))} вакцины!`}
      subheader={<>
        <div>Вам не хватает вакцины для покупки.</div>
        <div>Выполняй задания и получи вакцину бесплатно!</div>
      </>}
      actions={
        <Button
          size="l"
          onClick={() => {
            const body = document.getElementsByTagName('body')[0];
            body.style.overflowY = 'scroll';

            props.changePanel('tasks');
          }}
        >
          Выполнить
        </Button>
      }
      onClose={() => window.history.back()}
    />
  );
};
