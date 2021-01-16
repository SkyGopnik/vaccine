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

interface IProps {
  id: string,
  connectWs(socketUrl: string)
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
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
              onClick={() => connectWs(config.wsUrl)}
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
