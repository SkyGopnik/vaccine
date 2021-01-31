import React from 'react';
import lo from 'lodash';
import axios from "axios";
import { ModalRoot } from "@vkontakte/vkui";

// Панели
import GamePanel from '../../panels/Game/GameContainer';
import ImprovementsPanel from "../../panels/Improvements/ImprovementsContainer";

// Модалки
import NeedMoney from "src/modals/NeedMoney/NeedMoneyContainer";
import NewFriend from "src/modals/NewFriend/NewFriendContainer";
import RefMoney from "src/modals/RefMoney/RefMoneyContainer";
import TransferGet from "src/modals/TransferGet/TransferGetContainer";

// Компоненты
import ViewLight from '../../components/ViewLight';

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";
import {UserInterface} from "src/store/user/reducers";

import hashGet from "src/functions/hash_get";

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  id: string,
  user: UserInterface | null,
  panel: string,
  syncUser(data: UserInterface)
}

let timer;

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    const {
      user,
      sendWsMessage,
      syncUser,
      changeModal,
      changeView
    } = this.props;

    const ref = hashGet('ref');

    if (user.data.additional && !user.data.additional.onboard) {
      changeView('onboard');
    }

    if (ref) {
      try {
        const { data } = await axios.get(`/user/ref?refId=${ref}`);

        const refUser = lo.find(data, {
          userId: ref
        });

        const currentUser = lo.find(data, {
          userId: user.id
        });

        // Обновляем баланс пользователю который привёл реферала
        sendWsMessage({
          type: 'RefSystem',
          refId: ref,
          sum: refUser.click * 500
        });

        // Модалка с тем что ты получил денег за то что зашёл по рефералке
        changeModal('refMoney', {
          data: refUser,
          sum: currentUser.click * 1000
        });

        // Обновляем себе
        sendWsMessage({
          type: 'SyncUser'
        });

        window.location.hash = '';
      } catch (e) {
        console.log(e);

        window.location.hash = '';
      }
    }

    timer = setInterval(() => {
      const { user, panel } = this.props;

      if (user && user.data.passive !== 0 && panel === 'main') {
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
      panel
    } = this.props;

    return (
      <ViewLight
        id={id}
        activePanel={panel}
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
