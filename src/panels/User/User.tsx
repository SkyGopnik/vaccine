import React, {ReactNode} from 'react';
import axios from "axios";

import {
  Panel,
  Caption,
  Title,
  PanelHeader,
  Div,
  Avatar,
  Subhead,
  PullToRefresh, Spinner, Card as VkuiCard, Placeholder
} from '@vkontakte/vkui';
import { Icon56LockOutline } from '@vkontakte/icons';

import Card from 'src/components/Card/Card';
import Spacing from "src/components/Spacing";
import HistoryBackBtn from "src/components/HistoryBackBtn";

import balanceFormat, {locale} from "src/functions/balanceFormat";
import getDate from "src/functions/getDate";

import {RandomUserReducerInterface} from "src/store/randomUser/reducers";

import Img5 from "src/img/profile/5.svg";
import Img6 from "src/img/profile/6.svg";

import style from './User.scss';
import platformApi from "src/js/platformApi";

interface IProps extends RandomUserReducerInterface {
  id: string,
  snackbar: ReactNode | null,
  panelData: {
    userId?: string
    id: string
  }
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
    const { panelData, getRandomUser } = this.props;

    await getRandomUser({
      loading: true,
      id: panelData.userId || panelData.id
    });
  }

  async onRefresh() {
    const { panelData, getRandomUser } = this.props;

    this.setState({ ptr: true });

    setTimeout(async () => {
      await getRandomUser({
        loading: false,
        id: panelData.userId || panelData.id
      });

      this.setState({ ptr: false });
    }, 1000);
  }

  render() {
    const { id, snackbar, loading } = this.props;
    const { ptr } = this.state;
    const user = this.props.data;

    const { data, stat } = user || {};

    return (
      <Panel id={id} className={style.user}>
        <PanelHeader
          left={<HistoryBackBtn />}
          separator={false}
        >
          Профиль
        </PanelHeader>
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
          {!loading ? (
            !user.isClosed ? (
              <>
                <Div className={style.avatar}>
                  <a href={platformApi.getHref(user.type, user.id)} target="_blank">
                    <Avatar src={data.user.info.photo} size={72}>
                      {user.status && <div className="status status-24 status-profile">{user.status.code}</div>}
                    </Avatar>
                  </a>
                  <Title level="3" weight="medium">{data.user.info.firstName} {data.user.info.lastName}</Title>
                  {!user.isClosed && (
                    stat ? (
                      <Caption level="1" weight="regular">{stat.ratingPosition} место в рейтинге</Caption>
                    ) : (
                      <Caption level="1" weight="regular">Пинаем програмиста</Caption>
                    )
                  )}
                </Div>
                <Div>
                  <Card
                    icon={<img src={Img6} alt="" />}
                    title="Улучшения"
                  >
                    <Subhead className={style.improvements} weight="regular">
                      <div>· {balanceFormat(data.clickUser || 0)}/клик</div>
                      <div>· {balanceFormat(data.clickPassive || 0)}/сек</div>
                    </Subhead>
                  </Card>
                  <Card
                    icon={<img src={Img5} alt="" />}
                    title="Статистика"
                  >
                    <Subhead weight="regular">
                      <div>· Баланс: {locale(data.balance || 0)}</div>
                      <div>· Разработано: {locale(data.record) || 0}</div>
                      <div>· Спасено друзей: {stat.savedFriends && stat.savedFriends || 0}</div>
                      <div>· Получено вакцины: {stat.transfer && locale(stat.transfer) || 0}</div>
                      <div>· Произведено улучшений: {stat.improvements && locale(stat.improvements) || 0}</div>
                      <div>· Начало разработки вакцины: {stat.startAt ? getDate(stat.startAt) : 0}</div>
                      {/*<div>· Достижений: {stat.achievements || 0}</div>*/}
                    </Subhead>
                  </Card>
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
                  <Spacing size={110} />
                </Div>
              </>
            ) : (
              <Div>
                <VkuiCard mode="shadow">
                  <Placeholder
                    icon={<Icon56LockOutline />}
                    header="Это закрытый профиль"
                  >
                    Владелец не желает, чтобы информацию о его профиле видели другие пользователи
                  </Placeholder>
                </VkuiCard>
              </Div>
            )
          ) : (
            <Div>
              <Spinner />
            </Div>
          )}
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
