import React from 'react';
import {
  Panel,
  Placeholder,
  Button,
  Div
} from '@vkontakte/vkui';

import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";

import Error from "src/img/Error.png";

import { config } from 'src/js/config';

import style from './Error.scss';
import axios from "axios";

interface IProps {
  id: string,
  connectWs(socketUrl: string),
  syncUser(data: object),
  changeView(view: string)
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  async reconnect() {
    const { syncUser, connectWs, changeView } = this.props;

    try {
      const { data } = await axios.get('/user');

      syncUser(data);
      await connectWs(config.wsUrl);
    } catch (e) {
      changeView('error');
    }
  }

  render() {
    const { id, connectWs } = this.props;

    return (
      <Panel id={id}>
        <EmptyBackground />
        <div className={style.middle}>
          <Placeholder
            icon={<img src={Error} alt=""/>}
            header="Всё пошло к чертям"
          >
            В лаборатории произошла авария, один из работников допустил грубейшую ошибку. Мы скоро всё починим
          </Placeholder>
        </div>
        <div className={style.bottom}>
          <Div>
            <Button
              size="l"
              onClick={() => this.reconnect()}
              stretched
            >
              Попробовать ещё раз
            </Button>
          </Div>
        </div>
      </Panel>
    );
  }
}
