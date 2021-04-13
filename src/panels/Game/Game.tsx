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
      balancePlus,
      clickProgress,
      changeProgress,
      changeSnackbar
    } = this.props;
    const value = clickProgress + 2;

    if (value === 100) {
      for (let i = 0; i < 4; i++) {
        this.renderEffect();
      }

      balancePlus(user.data.click * 5);

      if (user.data.additional.vaccineClickNotification) {
        changeSnackbar(
          <Snackbar
            className="success-snack"
            layout="vertical"
            onClose={() => changeSnackbar(null)}
            before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14}
                                                                               height={14}/></Avatar>}
          >
            <div>Ты получил <span style={{fontWeight: 500}}>{locale(user.data.click * 5)}</span> вакцины</div>
            <div>Отличная работа, так держать!</div>
          </Snackbar>
        );
      }
    }

    changeProgress(value < 100 ? value : 0);
  }

  iconClick() {
    const {
      user,
      balancePlus,
      sendWsMessage
    } = this.props;
    const { lastClick } = this.state;
    const { time, count } = lastClick;

    this.setState({
      lastClick: {
        time: Math.round(new Date().getTime() / 1000),
        count: Math.round(new Date().getTime()  / 1000) === time ? (count + 1) : 0
      }
    });

    if (count < 7) {
      balancePlus(user.data.click);

      sendWsMessage({type: 'ClickUser'});

      if (!user.data.additional.easyAnimation) {
        this.renderEffect();
      }

      this.changeProgress();
    }
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
          left={
            <PanelHeaderButton onClick={() => changePanel('tasks')}>
              <Tooltip
                isShown={!user.data.additional.giftTooltip}
                onClose={() => changeAdditional({
                  giftTooltip: true
                })}
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
          }
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
            onClick={() => this.iconClick()}
          />
          <Progress className={style.progress} value={clickProgress} />
        </div>
        {snackbar}
      </Panel>
    );
  }
}
