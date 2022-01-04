import React, {ReactNode} from 'react';
import axios from "axios";

import {
  Panel,
  Caption,
  Title,
  PanelHeader,
  Div,
  Avatar,
  Button,
  SimpleCell,
  Snackbar, PanelHeaderButton, PullToRefresh, Progress, Text, Footer, Link
} from '@vkontakte/vkui';

import {
  Icon16Done,
  Icon28BugOutline,
  Icon28MessageOutline,
  Icon24ErrorCircleOutline,
  Icon28SettingsOutline,
  Icon28QuestionOutline,
  Icon28BuildingOutline
} from "@vkontakte/icons";

import Card from 'src/components/Card/Card';
import SubscribeGroup from "src/components/Profile/SubscribeGroupContainer";
import Spacing from "src/components/Spacing";
import StatCard from "src/components/Profile/StatCard";

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
import Img6 from "src/img/profile/6.svg";
import Img7 from "src/img/profile/7.svg";

import style from './index.module.scss';
import platformApi from "src/js/platformApi";
import Decimal from "decimal.js";

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
  ptr: boolean,
  adminClick: number
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ptr: false,
      adminClick: 0
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

  async setAdmin() {
    const { adminClick } = this.state;

    if (adminClick === 5) {
      try {
        await axios.post('/v1/admin');

        this.snackbar('Роль админа установлена', 'success');
      } catch (e) {
        this.snackbar('А что ещё хочешь?', 'error');
      }
    }

    this.setState({
      adminClick: adminClick + 1
    });
  }

  getLevel() {
    const { stat } = this.props.data;

    const lvlStart = (stat.level - 1) !== 0 ? Math.pow(3, stat.level - 1) : 0;
    const lvlEnd = Math.pow(3, stat.level);

    return {
      start: lvlStart,
      end: lvlEnd
    };
  }

  getDifference() {
    const { data, user } = this.props;
    const { stat } = data;

    return new Decimal(Math.pow(3, stat.level)).minus(new Decimal(user.data.record).toNumber()).toNumber();
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

    const { stat, notification, group } = data;
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
            <a href={platformApi.getHref(data.type, data.id)} target="_blank">
              <Avatar src={photo} size={72}>
                {user.status && <div className="status status-24 status-profile">{user.status.code}</div>}
              </Avatar>
            </a>
            <Title level="3" weight="medium">
              {firstName} {lastName}
            </Title>
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
              description="За каждого приглашенного друга в игру, вы получите вакцину на свой счёт"
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
                info: stat.savedFriends && stat.savedFriends !== 0 ? `${stat.savedFriends} ${declNum(stat.savedFriends, ['друг', 'друга', 'друзей'])} в игре` : ''
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
            <Card
              icon={<img src={Img7} alt="" />}
              title={`Уровень ${stat.level}`}
              actions={
                <Button
                  mode="outline"
                  size="m"
                  onClick={() => changePanel('levels')}
                >
                  Посмотреть все
                </Button>
              }
            >
              <div className={style.levels}>
                <div className={style.progressWrapper}>
                  {stat.level && (
                    <>
                      <Progress className={style.progress} value={100 - 100 / ((this.getLevel().end - this.getLevel().start) / this.getDifference())} />
                      <div className={style.numbers}>
                        <Caption level="3" weight="regular">{locale(this.getLevel().start)}</Caption>
                        <Caption level="3" weight="regular">{locale(this.getLevel().end)}</Caption>
                      </div>
                    </>
                  )}
                </div>
                <Text weight="regular">Осталось разработать <span style={{ fontWeight: 500 }}>{locale(new Decimal(Math.pow(3, stat.level)).minus(new Decimal(user.data.record).toNumber()).toNumber())}</span> вакцины, чтобы получить следующий уровень</Text>
              </div>
            </Card>
            {group && (
              <Card
                className={style.linkGroup}
                icon={<img src={Img6} alt="" />}
                title="Моя лаборатория"
              >
                <SimpleCell
                  before={<Avatar size={40} src={group.info.photo} />}
                  after={
                    <Button
                      mode="outline"
                      size="s"
                      onClick={() => changeModal('groupLeave', group.info)}
                    >
                      Покинуть
                    </Button>
                  }
                  description={`${group.users} ${declNum(group.users, ["учёный", "учёных", "учёных"])}`}
                  disabled
                >
                  {group.info.name}
                </SimpleCell>
              </Card>
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
            <StatCard stat={stat} />
            <Card noPadding>
              <SimpleCell
                before={<Icon28BuildingOutline />}
                description="Хочешь свою лабораторию? Так создай её"
                href={config.addCommunity}
                target="_blank"
                expandable
              >
                Новая лаборатория
              </SimpleCell>
              {!subGroup && (
                <SubscribeGroup />
              )}
              <SimpleCell
                before={<Icon28QuestionOutline />}
                description="Потерялся? Мы поможем"
                href={config.faqUrl}
                target="_blank"
                expandable
              >
                Часто задаваемые вопросы
              </SimpleCell>
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
            <Footer onClick={() => this.setAdmin()}>
              <div>Версия 2.2.0</div>
              <div>Сделано с <span style={{ color: 'var(--destructive)' }}>❤</span> от <Link target="_blank" href="https://vk.com/public191809582">SkyReglis Studio</Link></div>
            </Footer>
            <Spacing size={55} />
          </Div>
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
