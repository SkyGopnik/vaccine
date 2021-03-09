import React, {ReactNode} from 'react';
import bridge from '@vkontakte/vk-bridge';
import axios from 'axios';

import platformApi from "src/js/platformApi";

import {
  Panel,
  Caption,
  Title,
  PanelHeader,
  Div,
  Avatar,
  Button,
  Subhead,
  SimpleCell,
  Snackbar, PanelHeaderButton
} from '@vkontakte/vkui';

import {
  Icon16Done,
  Icon28BugOutline,
  Icon28MessageOutline,
  Icon28Users3Outline,
  Icon24ErrorCircleOutline,
  Icon28SettingsOutline
} from "@vkontakte/icons";

import Card from 'src/components/Card/Card';
import SubscribeGroup from "src/components/Profile/SubscribeGroupContainer";

import balanceFormat from "src/functions/balanceFormat";
import getDate from "src/functions/getDate";
import declBySex from "src/functions/declBySex";
import { locale } from "src/functions/balanceFormat";
import getNotifications from "src/functions/getNotifications";

import {UserInterface} from "src/store/user/reducers";

import {config} from "src/js/config";

import Img1 from "src/img/profile/1.svg";
import Img2 from "src/img/profile/2.svg";
import Img3 from "src/img/profile/3.svg";
import Img4 from "src/img/profile/4.svg";
import Img5 from "src/img/profile/5.svg";

import style from './Profile.scss';

interface IProps {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode | null,
  changeSnackbar(snackbar: ReactNode | null),
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean),
  changeAdditional(data: object),
  changePanel(panel: string, panelData?: any)
}

interface IState {
  stat: {
    ratingPosition?: number,
    startAt?: Date,
    record?: number,
    saveFriends?: number,
    transfer?: number,
    improvements?: number,
    achievements?: number
  },
  notification: {
    title: string,
    text: ReactNode,
    time: string
  } | null
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      stat: {},
      notification: null
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('/user/profile');

    this.setState({
      stat: data.stat,
      notification: data.notification ? getNotifications(data.notification, true) : null
    });
  }

  snackbar(text: string, type: 'success' | 'error') {
    const { changeSnackbar } = this.props;

    changeSnackbar(
      <Snackbar
        className={`${type}-snack`}
        layout="vertical"
        onClose={() => changeSnackbar(null)}
        before={
          type === 'success' ? (
            <Avatar size={24} style={{background: '#fff'}}>
              <Icon16Done fill="#6A9EE5" width={14} height={14} />
            </Avatar>
          ) : (
            <Icon24ErrorCircleOutline fill="#fff" />
          )
        }
      >
        {text}
      </Snackbar>
    );
  }

  render() {
    const {
      id,
      user,
      snackbar,
      changeModal,
      changePanel
    } = this.props;
    const { stat, notification } = this.state;

    const { subGroup } = user.data.additional || {};
    const { photo, firstName, lastName } = user.info || {};

    return (
      <Panel id={id}>
        <PanelHeader
          left={
            <PanelHeaderButton onClick={() => changePanel('settings')}>
              <Icon28SettingsOutline />
            </PanelHeaderButton>
          }
          separator={false}
        >
          Профиль
        </PanelHeader>
        <Div className={style.avatar}>
          <Avatar src={photo} size={72} />
          <Title level="3" weight="medium">{firstName} {lastName}</Title>
          {stat.ratingPosition ? (
            <Caption level="1" weight="regular">{stat.ratingPosition.toLocaleString()} место в рейтинге</Caption>
          ) : (
            <Caption level="1" weight="regular">Пинаем програмиста</Caption>
          )}
        </Div>
        <Div>
          <Card
            icon={<img src={Img1} alt="" />}
            title="Спасение друзей"
            description="За каждое приглашение друга в игру вы получите вакцину на свой счёт"
            actionsInfo={{
              action: (
                <Button
                  mode="outline"
                  size="m"
                  onClick={() => changePanel('ref')}
                >
                  Пригласить
                </Button>
              ),
              info: '0 друзей в игре'
            }}
          />
          <Card
            icon={<img src={Img2} alt="" />}
            title="Передача вакцины"
            actions={<>
              <Button
                size="m"
                onClick={() => changePanel('friends')}
                stretched
              >
                Другу
              </Button>
              <Button
                size="m"
                onClick={() => changeModal('transferUser')}
                stretched
              >
                Не другу
              </Button>
            </>}
          />
          {notification && (
            <Card
              icon={<img src={Img3} alt="" />}
              title="События"
              description={<span><span style={{ fontWeight: 500 }}>{notification.title}</span> {notification.text}</span>}
              subDescription={notification.time}
              actions={
                <Button
                  mode="outline"
                  size="m"
                  onClick={() => changePanel('notifications')}
                >
                  Посмотреть все
                </Button>
              }
            />
          )}
          {/*<Card*/}
          {/*  icon={<img src={Img4} alt="" />}*/}
          {/*  title={<span>Достижения <span style={{ color: '#99A2AD' }}>12</span></span>}*/}
          {/*>*/}
          {/*  <HorizontalScroll showArrows  getScrollToLeft={i => i - 120} getScrollToRight={i => i + 120}>*/}
          {/*    <div style={{ display: 'flex' }}>*/}
          {/*      <div className={style.achievement}>*/}
          {/*        1*/}
          {/*      </div>*/}
          {/*      <div className={style.achievement}>*/}
          {/*        2*/}
          {/*      </div>*/}
          {/*      <div className={style.achievement}>*/}
          {/*        3*/}
          {/*      </div>*/}
          {/*      <div className={style.achievement}>*/}
          {/*        4*/}
          {/*      </div>*/}
          {/*      <div className={style.achievement}>*/}
          {/*        5*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </HorizontalScroll>*/}
          {/*</Card>*/}
          <Card
            icon={<img src={Img5} alt="" />}
            title="Статистика"
          >
            <Subhead weight="regular">
              <div>· Начало разработки вакцины: {stat.startAt ? getDate(stat.startAt) : 0}</div>
              <div>· Разработано: {stat.record && locale(stat.record) || 0}</div>
              <div>· Спасено друзей: {stat.saveFriends || 0}</div>
              <div>· Получено вакцины от друзей: {stat.transfer && locale(stat.transfer) || 0}</div>
              <div>· Произведено улучшений: {stat.improvements || 0}</div>
              {/*<div>· Достижений: {stat.achievements || 0}</div>*/}
            </Subhead>
          </Card>
          <Card noPadding>
            {!subGroup && (
              <SubscribeGroup />
            )}
            <SimpleCell
              before={<Icon28MessageOutline />}
              description="Общайтесь с другими игроками"
              href={config.chatUrl}
              target="_blank"
              expandable
            >
              Наша беседа
            </SimpleCell>
            <SimpleCell
              before={<Icon28BugOutline />}
              description="Поделитесь идеей или ошибкой"
              href={config.messageGroupUrl}
              target="_blank"
              expandable
            >
              Написать разработчикам
            </SimpleCell>
          </Card>
        </Div>
        {snackbar}
      </Panel>
    );
  }
}
