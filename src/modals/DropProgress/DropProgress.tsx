import React from 'react';
import {
  ModalCard,
  Button
} from "@vkontakte/vkui";

import {UserInterface} from "src/store/user/reducers";
import axios from "axios";

interface IProps {
  id: string,
  modalData: {
    need: number
  },
  user: UserInterface,
  changeModal(modal: string | null, modalData?: Object, isPopstate?: boolean),
  changePanel(panel: string)
}

export default (props: IProps) => {
  const dropProgress = async () => {
    await axios.delete('/user');

    document.location.reload();
  };

  return (
    <ModalCard
      header="Вы уверены, что хотите сбросить весь прогресс?"
      subheader={<>
        <div>Весь прогресс будет сброшен.</div>
        <div>Рейтинг и переводы будут разблокированы.</div>
        <div>Действие нельзя будет отменить.</div>
      </>}
      actions={
        <Button
          size="l"
          onClick={() => dropProgress()}
        >
          Сбросить прогресс
        </Button>
      }
      onClose={() => window.history.back()}
    />
  );
};
