import React from 'react';
import axios from "axios";
import {
  Panel,
  Placeholder,
  Button,
  Div, Link
} from '@vkontakte/vkui';

import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";

import Error from "src/img/Error.png";

import { config } from 'src/js/config';

import style from './Error.scss';

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

    const error = (error: string) => {
      throw Error(error);
    };

    try {
      const { data } = await axios.get('/user');

      if (data.role === 'user') {
        error('Block users');
      }

      syncUser(data);
      await connectWs(config.wsUrl);
    } catch (e) {
      changeView('error');
    }
  }

  render() {
    const { id } = this.props;

    return (
      <Panel id={id}>
        <EmptyBackground />
        <div className={style.middle}>
          <Placeholder
            icon={<img src={Error} alt=""/>}
            header="Всё пошло к чертям"
          >
            Похоже, произошла ошибка, попробуйте переподключиться или сообщите об этом нам в <Link href={config.messageGroupUrl} target="_blank">сообщество</Link>
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
