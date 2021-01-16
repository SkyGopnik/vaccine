import React from 'react';
import lo from 'lodash';
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
import {UserInterface} from "src/store/user/reducers";

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  id: string,
  user: UserInterface | null,
  syncUser(data: UserInterface)
}

let timer;

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const { sendWsMessage, syncUser } = this.props;

    timer = setInterval(() => {
      const { user } = this.props;

      if (user) {
        syncUser(lo.merge(user, {
          data: {
            balance: user.data.balance + user.data.passive
          }
        }));
        sendWsMessage({ type: 'ClickPassive' });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    const {
      id,
      panel,
      modal
    } = this.props;

    return (
      <ViewLight
        id={id}
        activePanel={panel}
        modal={
          <ModalRoot activeModal={modal} onClose={() => window.history.back()}>
            <NeedMoney id="needMoney" />
          </ModalRoot>
        }
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
