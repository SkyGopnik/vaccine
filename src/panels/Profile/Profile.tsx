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
  Snackbar
} from '@vkontakte/vkui';

import {
  Icon16Done,
  Icon28BugOutline,
  Icon28MessageOutline,
  Icon28Users3Outline,
  Icon24ErrorCircleOutline
} from "@vkontakte/icons";

import Card from 'src/components/Card/Card';
import SubscribeGroup from "src/components/Profile/SubscribeGroupContainer";

import balanceFormat from "src/functions/balanceFormat";
import getDate from "src/functions/getDate";
import declBySex from "src/functions/declBySex";

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
  changeAdditional(data: object)
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
  }
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      stat: {}
    };
  }

  async componentDidMount() {
    const stat = await axios.get('/user/profile');

    console.log(stat.data);

    this.setState({
      stat: stat.data
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
      changeAdditional
    } = this.props;
    const { stat } = this.state;

    const { subGroup } = user.data.additional || {};
    const { photo, firstName, lastName } = user.info || {};

    return (
      <Panel id={id}>
        <PanelHeader separator={false}>
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
          {/*{balance > 100 && (*/}
          {/*  <Card*/}
          {/*    icon={<img src={Img1} alt="" />}*/}
          {/*    title="Спасение друзей"*/}
          {/*    description="За каждое приглашение друга в игру вы получите вакцину на свой счёт"*/}
          {/*    actionsInfo={{*/}
          {/*      action: (*/}
          {/*        <Button*/}
          {/*          mode="outline"*/}
          {/*          size="m"*/}
          {/*          onClick={() => platformApi.shareRef(user.id, (res) => {*/}
          {/*            if (res['post_id']) {*/}
          {/*              this.snackbar('Вы успешно поделились реферальной ссылкой', 'success');*/}
          {/*            }*/}
          {/*          })}*/}
          {/*        >*/}
          {/*          Пригласить*/}
          {/*        </Button>*/}
          {/*      ),*/}
          {/*      info: stat.saveFriends && stat.saveFriends !== 0 ? `${stat.saveFriends} ${declNum(stat.saveFriends, ['друг', 'друга', 'друзей'])} в игре` : ''*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
          <Card
            icon={<img src={Img2} alt="" />}
            title="Передача вакцины"
            actions={<>
              {platformApi.checkSupport() && (
                <Button
                  size="m"
                  onClick={async () => {
                    const { users } = await bridge.send("VKWebAppGetFriends");
                    const { data } = await axios.get(`/user/check?userId=${users[0].id}`);
                    const user = users[0];

                    if (data) {
                      changeModal('transferMoney', {
                        userId: String(user.id),
                        firstName: user.first_name,
                        lastName: user.last_name,
                        photo: user.photo_200,
                        sex: user.sex
                      });
                    } else {
                      this.snackbar(`Похоже, ${user.first_name} ${user.last_name} ещё не ${declBySex(user.sex, ['заходил (a)', 'заходила', 'заходил'])} в игру`, 'error');
                    }
                  }}
                  stretched
                >
                  Другу
                </Button>
              )}
              <Button
                size="m"
                onClick={() => changeModal('transferUser')}
                stretched
              >
                Не другу
              </Button>
            </>}
          />
          {/*<Card*/}
          {/*  icon={<img src={Img3} alt="" />}*/}
          {/*  title="События"*/}
          {/*  description={<span><span style={{ fontWeight: 500 }}>Ника Гаркуша</span> получила вакцину от вас</span>}*/}
          {/*  subDescription="3 часа назад"*/}
          {/*  actions={*/}
          {/*    <Button*/}
          {/*      mode="outline"*/}
          {/*      size="m"*/}
          {/*    >*/}
          {/*      Посмотреть все*/}
          {/*    </Button>*/}
          {/*  }*/}
          {/*/>*/}
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
              <div>· Разработано: {stat.record ? balanceFormat(stat.record) : 0}</div>
              <div>· Спасено друзей: {stat.saveFriends || 0}</div>
              <div>· Получено вакцины от друзей: {stat.transfer || 0}</div>
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
