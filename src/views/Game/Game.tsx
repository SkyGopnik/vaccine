import React from 'react';
import { ModalRoot } from "@vkontakte/vkui";

// Панели
import GamePanel from '../../panels/Game/GameContainer';
import ImprovementsPanel from "../../panels/Improvements/ImprovementsContainer";

// Модалки
import NeedMoney from "src/modals/NeedMoney/NeedMoneyContainer";

// Компоненты
import ViewLight from '../../components/ViewLight';

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  id: string
}

let timer;

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const { sendWsMessage } = this.props;

    timer = setInterval(() => {
      sendWsMessage({ type: 'ClickPassive' });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    const {
      id,
      panel,
      modal,
      changeModal
    } = this.props;

    const modalComponent = (
      <ModalRoot activeModal={modal} onClose={() => changeModal(null)}>
        <NeedMoney id="needMoney" />
      </ModalRoot>
    );

    return (
      <ViewLight
        id={id}
        activePanel={panel}
        modal={modalComponent}
        panelList={[
          {
            id: 'main',
            component: GamePanel
          },
          {
            id: 'improvements',
            component: ImprovementsPanel
          }
        ]}
      />
    );
  }
}
