import React, {ReactNode} from 'react';

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
  Snackbar, PanelHeaderButton, PullToRefresh
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

import getDate from "src/functions/getDate";
import declNum from "src/functions/decl_num";
import { locale } from "src/functions/balanceFormat";

import {UserInterface} from "src/store/user/reducers";
import {ProfileReducerInterface} from "src/store/profile/reducers";

import {config} from "src/js/config";

import Img1 from "src/img/profile/1.svg";
import Img2 from "src/img/profile/2.svg";
import Img3 from "src/img/profile/3.svg";
import Img4 from "src/img/profile/4.svg";
import Img5 from "src/img/profile/5.svg";

import style from './Profile.scss';

interface IProps extends ProfileReducerInterface {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode | null,
  changeSnackbar(snackbar: ReactNode | null),
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean),
  changeAdditional(data: object),
  changePanel(panel: string, panelData?: any)
}

interface IState {
  ptr: boolean
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ptr: false
    };
  }

  async componentDidMount() {
    const { getProfile } = this.props;

    await getProfile();
  }

  async onRefresh() {
    const { getProfile } = this.props;

    this.setState({ ptr: true });

    setTimeout(async () => {
      await getProfile(false);

      this.setState({ ptr: false })
    }, 1000);
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
      data,
      snackbar,
      changeModal,
      changePanel
    } = this.props;
    const { ptr } = this.state;

    const { stat, notification } = data;
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
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
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
            <Card
              icon={<img src={Img1} alt="" />}
              title="Спасение друзей"
              description="За каждое приглашение друга в игру вы получите вакцину на свой счёт"
              actionsInfo={{
                action: (
                  <Button
                    mode="outline"
                    size="m"
                    disabled={!data}
                    onClick={() => changePanel('ref')}
                  >
                    Пригласить
                  </Button>
                ),
                info: stat.saveFriends && stat.saveFriends !== 0 ? `${stat.saveFriends} ${declNum(stat.saveFriends, ['друг', 'друга', 'друзей'])} в игре` : ''
              }}
            />
            {notification && (
              <Card
                icon={<img src={Img3} alt="" />}
                title="События"
                description={<span>{notification.isProfileTitle && <span style={{ fontWeight: 500 }}>{notification.title}</span>} {notification.text}</span>}
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
            {/*<Spacing size={55} />*/}
          </Div>
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
