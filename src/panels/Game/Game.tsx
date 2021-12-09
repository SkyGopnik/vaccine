import React, {ReactNode} from 'react';
import {
  Panel,
  Progress,
  Caption,
  Title,
  Avatar,
  Snackbar,
  PanelHeaderButton,
  PanelHeader,
  Tooltip
} from '@vkontakte/vkui';
import {Icon28GiftOutline, Icon16Done} from '@vkontakte/icons';

import MainIcon from "src/components/MainIcon";
import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";
import VaccineEffect from "src/components/VaccineEffect/VaccineEffect";

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";
import {UserInterface} from "src/store/user/reducers";

import balanceFormat, { locale } from "src/functions/balanceFormat";

import style from './Game.scss';
import declBySex from "src/functions/declBySex";
import axios from "axios";
import bridge from "@vkontakte/vk-bridge";

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  id: string,
  user: UserInterface | null,
  clickProgress: number,
  snackbar: ReactNode,
  syncUser(data: UserInterface),
  changeProgress(progress: number),
  balancePlus(sum: number),
  changeSnackbar(snackbar: ReactNode | null),
  changePanel(panel: string, panelData?: any),
  changeAdditional(data: object)
}

interface IState {
  effects: Array<number>,
  lastClick: {
    time: number | null,
    count: number
  },
  lastInterval: {
    time: number | null,
    interval: number,
    count: number
  },
  showAds: Date | null
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      effects: [],
      lastClick: {
        time: null,
        count: 0
      },
      lastInterval: {
        time: null,
        interval: 0,
        count: 0
      },
      showAds: null
    };

    this.iconClick = this.iconClick.bind(this);
  }

  renderEffect() {
    const { effects } = this.state;

    const lastChild = effects.length === 0 ? 1 : effects[effects.length - 1] + 1;

    effects.push(lastChild <= 4 ? lastChild : 1);

    this.setState({
      effects: effects.length < 100 ? effects : [1]
    });
  }

  async changeProgress() {
    const {
      user,
      balancePlus,
      clickProgress,
      changeProgress,
      changeSnackbar
    } = this.props;

    const value = clickProgress + 2;

    await changeProgress(value < 100 ? value : 0);

    if (this.props.clickProgress === 0) {
      for (let i = 0; i < 4; i++) {
        this.renderEffect();
      }

      balancePlus(user.data.clickUser * 5);

      if (user.data.additional.vaccineClickNotification) {
        changeSnackbar(
          <Snackbar
            className="success-snack"
            layout="vertical"
            onClose={() => changeSnackbar(null)}
            before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
          >
            <div>Ты {declBySex(user.info.sex, ['получил (a)', 'получила', 'получил'])} <span style={{fontWeight: 500}}>{locale(user.data.clickUser * 5)}</span> вакцины</div>
            <div>Отличная работа, так держать!</div>
          </Snackbar>
        );
      }
    }
  }

  async iconClick(e) {
    const {
      user,
      balancePlus,
      sendWsMessage
    } = this.props;
    const { lastClick, lastInterval, showAds } = this.state;

    const newInterval = new Date().getTime() - lastInterval.time;

    this.setState({
      lastClick: {
        time: Math.round(new Date().getTime() / 1000),
        count: Math.round(new Date().getTime() / 1000) === lastClick.time ? (lastClick.count + 1) : 0
      },
      lastInterval: {
        time: new Date().getTime(),
        interval: new Date().getTime() - lastInterval.time,
        count: (newInterval - 25) < lastInterval.interval && lastInterval.interval < (newInterval + 25) ? (lastInterval.count + 1) : 0
      },
      showAds: new Date()
    });

    if (lastClick.count <= 10) {
      const time = new Date().getTime();
      const x = e.pageX;
      const y = e.pageY;

      balancePlus(user.data.clickUser);

      sendWsMessage({
        type: 'ClickUser',
        time,
        x,
        y,
        hash: time + x + y
      });

      if (!user.data.additional.easyAnimation) {
        this.renderEffect();
      }

      await this.changeProgress();
    }

    // if (lastClick.count === 30) {
    //   await reportUser('cpsLimit','Пользователь достиг больше 30 CPS');
    // } else if (lastClick.count === 40) {
    //   await reportUser('cpsLimit','Пользователь достиг больше 40 CPS');
    // } else if (lastClick.count === 50) {
    //   await reportUser('cpsLimit','Пользователь достиг больше 50 CPS');
    // }
    //
    // if (lastInterval.count === 100) {
    //   await reportUser('intervalLimit','Пользователь достиг больше 100 Interval');
    // } else if (lastInterval.count === 150) {
    //   await reportUser('intervalLimit','Пользователь достиг больше 150 Interval');
    // } else if (lastInterval.count === 200) {
    //   await reportUser('intervalLimit','Пользователь достиг больше 200 Interval');
    // } else if (lastInterval.count === 300) {
    //   await reportUser('intervalLimit','Пользователь достиг больше 300 Interval');
    // }
  }

  render() {
    const {
      id,
      user,
      snackbar,
      clickProgress,
      changePanel,
      changeAdditional
    } = this.props;
    const { effects } = this.state;

    return (
      <Panel id={id} className={style.game}>
        <PanelHeader
          left={user.data && (
            <PanelHeaderButton onClick={() => changePanel('tasks')}>
              <Tooltip
                isShown={!user.data.additional.giftTooltip && user.data.level > 1}
                onClose={() => {
                  console.log('giftTooltip')
                  changeAdditional({
                    giftTooltip: true
                  });
                }}
                alignX="left"
                cornerOffset={-10}
                offsetX={5}
                offsetY={5}
                text="Лёгкие задания, помогающие быстрее развиться"
                header="Бесплатная вакцина"
              >
                <Icon28GiftOutline />
              </Tooltip>
            </PanelHeaderButton>
          )}
          separator={false}
        />
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
                + {balanceFormat(user.data.clickPassive)}/сек
              </Caption>
              <Caption
                level="1"
                weight="semibold"
              >
                + {balanceFormat(user.data.clickUser)}/клик
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
            onClick={this.iconClick}
          />
          <Progress className={style.progress} value={clickProgress} />
        </div>
        {snackbar}
      </Panel>
    );
  }
}
