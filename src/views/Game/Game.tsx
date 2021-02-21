import React from 'react';
import lo from 'lodash';
import Decimal from 'decimal.js';
import axios from "axios";

// Панели
import GamePanel from '../../panels/Game/GameContainer';
import ImprovementsPanel from "../../panels/Improvements/ImprovementsContainer";

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

interface IState {
  refUsed: boolean,
  horizontal: boolean
}

let timer;

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      refUsed: false,
      horizontal: false
    };
  }

  async componentDidMount() {
    const { sendWsMessage } = this.props;

    this.showOnboard();

    timer = setInterval(() => {
      const { user, panel, syncUser } = this.props;
      const { refUsed } = this.state;

      if (panel === 'main' && user && user.data.passive !== 0) {
        sendWsMessage({ type: 'ClickPassive' });

        syncUser(lo.merge(user, {
          data: {
            balance: new Decimal(user.data.balance).add(user.data.passive)
          }
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  showOnboard() {
    const { user, changeView } = this.props;

    if (user.data.additional && !user.data.additional.onboard) {
      changeView('onboard');
    }
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