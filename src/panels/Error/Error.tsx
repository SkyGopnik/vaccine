import React from 'react';
import {
  Panel,
  Spinner,
  Placeholder,
  Button,
  Div
} from '@vkontakte/vkui';

import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";

import Error from "src/img/Error.png";

import style from './Error.scss';

interface IProps {
  id: string
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
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
            В лаборатории произошла авария, один из работников допустил грубейшую ошибку. Мы скоро всё починим
          </Placeholder>
        </div>
        <div className={style.bottom}>
          <Div>
            <Button
              size="l"
              stretched
            >
              Ок, отдохну...
            </Button>
          </Div>
        </div>
      </Panel>
    );
  }
}
