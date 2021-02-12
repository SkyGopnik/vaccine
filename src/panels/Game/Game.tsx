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
  effects: Array<number>,
  progress: number,
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
      progress: 0,
      antiClick: {
        count: 0,
        x: 0,
        y: 0
      }
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

    effects.push(lastChild <= 4 ? lastChild : 1);

    this.setState({
      effects: effects.length < 100 ? effects : [1]
    });
  }

  changeProgress() {
    const { progress } = this.state;
    const { user, syncUser } = this.props;
    const value = progress + 2;

    if (value === 102) {
      for (let i = 0; i < 4; i++) {
        this.renderEffect();
      }

      syncUser(lo.merge(user, {
        data: {
          balance: user.data.balance + user.data.click * 10
        }
      }));
    }

    this.setState({
      progress: value <= 100 ? value : 0
    });
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
      syncUser(lo.merge(user, {
        data: {
          balance: user.data.balance + user.data.click
        }
      }));

      sendWsMessage({type: 'ClickUser'});

      this.renderEffect();
      this.changeProgress();
    }
  }

  render() {
    const { id, user } = this.props;
    const { effects, progress } = this.state;

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
            onClick={(e) => this.iconClick(e)}
          />
          <Progress className={style.progress} value={progress} />
        </div>
      </Panel>
    );
  }
}
