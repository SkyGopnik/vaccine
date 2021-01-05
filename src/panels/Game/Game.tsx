import React from 'react';
import lo from 'lodash';
import {
  Panel,
  Progress,
  Caption,
  Title
} from '@vkontakte/vkui';

import MainIcon from "src/components/MainIcon";
import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";
import {UserInterface} from "src/store/user/reducers";

import style from './Game.scss';

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  id: string,
  user: UserInterface | null,
  loading: boolean,
  syncUser(data: any)
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {
      id,
      loading,
      user,
      sendWsMessage,
      syncUser
    } = this.props;

    return (
      <Panel id={id}>
        <EmptyBackground />
        {user && (
          <div className={style.info}>
            {/*64px top*/}
            <div className={style.balance}>
              {loading}
              <Caption
                level="1"
                weight="semibold"
                caps
              >
                Баланс
              </Caption>
              <Title
                level="1"
                weight="bold"
              >
                {user.data.balance}
              </Title>
            </div>
            <div className={style.stat}>
              <Caption
                level="1"
                weight="semibold"
              >
                + {user.data.passive}/сек
              </Caption>
              <Caption
                level="1"
                weight="semibold"
              >
                + {user.data.click}/клик
              </Caption>
            </div>
          </div>
        )}
        <div className={style.iconWithProgress}>
          <MainIcon
            className={style.icon}
            onClick={() => {
              syncUser(lo.merge(user, {
                data: {
                  balance: user.data.balance + user.data.click
                }
              }));
              sendWsMessage({ type: 'ClickUser' });
            }}
          />
          <Progress className={style.progress} value={40} />
        </div>
      </Panel>
    );
  }
}
