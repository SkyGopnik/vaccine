import React from 'react';
import Decimal from 'decimal';
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

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";
import {UserInterface} from "src/store/user/reducers";

import style from './Game.scss';

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  id: string,
  user: UserInterface | null,
  clickProgress: number,
  syncUser(data: UserInterface),
  changeProgress(progress: number)
}

interface IState {
  effects: Array<number>,
  antiClick: {
    count: number,
    x: number,
    y: number
  }
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      effects: [],
      antiClick: {
        count: 0,
        x: 0,
        y: 0
      }
    };
  }

  renderEffect() {
    const { effects } = this.state;

    const lastChild = effects.length === 0 ? 1 : effects[effects.length - 1] + 1;

    effects.push(lastChild <= 4 ? lastChild : 1);

    this.setState({
      effects: effects.length < 100 ? effects : [1]
    });
  }

  changeProgress() {
    const {
      user,
      syncUser,
      clickProgress,
      changeProgress
    } = this.props;
    const value = clickProgress + 2;

    if (value === 100) {
      for (let i = 0; i < 4; i++) {
        this.renderEffect();
      }

      syncUser(lo.merge(user, {
        data: {
          balance: user.data.balance + user.data.click * 5
        }
      }));
    }

    changeProgress(value < 100 ? value : 0);
  }

  iconClick(e) {
    const icon = e.target.getBoundingClientRect();
    const {
      user,
      syncUser,
      sendWsMessage
    } = this.props;
    const { antiClick } = this.state;

    var x = e.clientX - icon.left;
    var y = e.clientY - icon.top;

    this.setState({
      antiClick: {
        count: (antiClick.x === x && antiClick.y == y) ? (antiClick.count + 1) : 0,
        x, y
      }
    });

    if (antiClick.count < 25) {
      // console.log('--------');
      // console.log(user.data.balance);
      // console.log(user.data.click);
      // console.log((+user.data.balance + user.data.click).toFixed(4));

      syncUser(lo.merge(user, {
        data: {
          balance: Decimal(user.data.balance).add(user.data.click).toNumber()
        }
      }));

      sendWsMessage({type: 'ClickUser'});

      this.renderEffect();
      this.changeProgress();
    }
  }

  render() {
    const { id, user, clickProgress } = this.props;
    const { effects } = this.state;

    return (
      <Panel id={id}>
        <EmptyBackground />
        {user && user.data && (
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
                {Decimal(user.data.balance).toNumber().toFixed(4)}
              </Title>
            </div>
            <div className={style.stat}>
              <Caption
                level="1"
                weight="semibold"
              >
                + {user.data.passive.toFixed(4)}/сек
              </Caption>
              <Caption
                level="1"
                weight="semibold"
              >
                + {user.data.click.toFixed(4)}/клик
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
            onMouseUp={(e) => this.iconClick(e)}
          />
          <Progress className={style.progress} value={clickProgress} />
        </div>
      </Panel>
    );
  }
}
