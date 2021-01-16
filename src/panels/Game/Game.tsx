import React, {ReactElement} from 'react';
import lo from 'lodash';
import {
  Panel,
  Progress,
  Caption,
  Title
} from '@vkontakte/vkui';

import MainIcon from "src/components/MainIcon";
import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";
import VaccineEffect from "src/components/VaccineEffect/VaccineEffect";

import getRandomInt from 'src/functions/get_random_int'

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";
import {UserInterface} from "src/store/user/reducers";

import style from './Game.scss';

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  id: string,
  user: UserInterface | null,
  syncUser(data: UserInterface)
}

interface IState {
  effects: Array<number>
}

let effectTimeout;

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      effects: []
    };
  }

  balanceFormat(balance: number) {
    if (balance.toString().split('.').length === 2) {
      return balance.toLocaleString();
    }

    return `${balance.toLocaleString()},0`;
  }

  renderEffect() {
    const { effects } = this.state;

    const lastChild = effects.length === 0 ? 1 : effects[effects.length - 1] + 1;

    effects.push(lastChild <= 5 ? lastChild : 1);

    this.setState({
      effects: effects.length < 100 ? effects : [1]
    });
  }

  render() {
    const {
      id,
      user,
      sendWsMessage,
      syncUser
    } = this.props;
    const { effects } = this.state;

    return (
      <Panel id={id}>
        <EmptyBackground />
        {user && (
          <div className={style.info}>
            {/*64px top*/}
            <div className={style.balance}>
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
                {this.balanceFormat(user.data.balance)}
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
          {effects.map((item, index) => (
            <VaccineEffect key={index} variant={item} />
          ))}
          <MainIcon
            className={style.icon}
            onClick={() => {
              syncUser(lo.merge(user, {
                data: {
                  balance: user.data.balance + user.data.click
                }
              }));
              sendWsMessage({ type: 'ClickUser' });

              this.renderEffect();
            }}
          />
          <Progress className={style.progress} value={40} />
        </div>
      </Panel>
    );
  }
}
