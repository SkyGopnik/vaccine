import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import Decimal from 'decimal.js';
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

import balanceFormat, { locale } from "src/functions/balanceFormat";

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
    cheatCount: number,
    click: {
      count: number,
      x: number,
      y: number,
    },
    interval: {
      time: number,
      last: number,
      count: number
    }
  },
  lastClick: {
    time: number | null,
    count: number
  }
}

const antiClickDefault = {
  cheatCount: 0,
  click: {
    count: 0,
    x: 0,
    y: 0,
  },
  interval: {
    time: 0,
    last: 0,
    count: 0
  }
};

let isAdsShown = false;

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      effects: [],
      antiClick: antiClickDefault,
      lastClick: {
        time: null,
        count: 0
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
          balance: new Decimal(user.data.balance).add(user.data.click * 5)
        }
      }));
    }

    changeProgress(value < 100 ? value : 0);
  }

  iconClick(e) {
    // const icon = e.target.getBoundingClientRect();
    const {
      user,
      syncUser,
      sendWsMessage
    } = this.props;
    const { lastClick } = this.state;
    const { time, count } = lastClick;
    // const { cheatCount, click, interval } = antiClick;

    // const x = Math.round(e.clientX - icon.left);
    // const y = Math.round(e.clientY - icon.top);
    //
    // const time = new Date().getTime(); // Текущее время
    // const curInterval = time - interval.time; // Текущий интервал
    // const inaccuracy = 20; // Погрешность +- наше число
    //
    // const checkIntervalSimilarity = curInterval >= (interval.last - inaccuracy) && curInterval <= (interval.last + inaccuracy);
    // const nextInterval = interval.count + 1;

    this.setState({
      lastClick: {
        time: Math.round(new Date().getTime() / 1000),
        count: Math.round(new Date().getTime()  / 1000) === time ? (count + 1) : 0
      }
    });

    // console.log('----');
    // console.log(curInterval);
    // console.log('x - ', click.x, ' y - ', click.y, ' real X - ', x, ' real Y - ', y);
    // console.log(click.count);
    // console.log('user cheat - ' + cheatCount);

    if (count < 10) {
      syncUser(lo.merge(user, {
        data: {
          balance: new Decimal(user.data.balance).add(user.data.click)
        }
      }));

      sendWsMessage({type: 'ClickUser'});

      if (!user.data.additional.easyAnimation) {
        this.renderEffect();
      }

      this.changeProgress();
    }
    // } else {
    //   console.log('----');
    //   console.log(cheatCount);
    //   console.log(click.count);
    //   if (!isAdsShown) {
    //     isAdsShown = true;
    //     // @ts-ignore
    //     bridge.send('VKWebAppShowNativeAds', {ad_format: 'reward'})
    //       .then((res) => {
    //         isAdsShown = false;
    //       }).catch((err) => {
    //         isAdsShown = false;
    //       });
    //
    //     setTimeout(() => {
    //       isAdsShown = false;
    //
    //       this.setState({
    //         antiClick: antiClickDefault
    //       });
    //     }, 3000);
    //   }
    // }
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
                {balanceFormat(user.data.balance)}
              </Title>
            </div>
            <div className={style.stat}>
              <Caption
                level="1"
                weight="semibold"
              >
                + {balanceFormat(user.data.passive)}/сек
              </Caption>
              <Caption
                level="1"
                weight="semibold"
              >
                + {balanceFormat(user.data.click)}/клик
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
          <Progress className={style.progress} value={clickProgress} />
        </div>
      </Panel>
    );
  }
}
