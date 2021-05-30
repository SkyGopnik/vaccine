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
  PullToRefresh, Spinner
} from '@vkontakte/vkui';

import Card from 'src/components/Card/Card';
import Spacing from "src/components/Spacing";
import HistoryBackBtn from "src/components/HistoryBackBtn";

import balanceFormat, {locale} from "src/functions/balanceFormat";
import getDate from "src/functions/getDate";

import {RandomUserReducerInterface} from "src/store/randomUser/reducers";

import Img5 from "src/img/profile/5.svg";
import Img6 from "src/img/profile/6.svg";

import style from './User.scss';

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
    const { click, passive } = data || {};
    const { firstName, lastName, photo } = data.user && data.user.info || {};

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
            <>
              <Div className={style.avatar}>
                <Avatar src={photo} size={72} />
                <Title level="3" weight="medium">{firstName} {lastName}</Title>
                {stat ? (
                  <Caption level="1" weight="regular">{stat.ratingPosition} место в рейтинге</Caption>
                ) : (
                  <Caption level="1" weight="regular">Пинаем програмиста</Caption>
                )}
              </Div>
              <Div>
                <Card
                  icon={<img src={Img6} alt="" />}
                  title="Улучшения"
                >
                  <Subhead className={style.improvements} weight="regular">
                    <div>· {balanceFormat(click || 0)}/клик</div>
                    <div>· {balanceFormat(passive || 0)}/сек</div>
                  </Subhead>
                </Card>
                <Card
                  icon={<img src={Img5} alt="" />}
                  title="Статистика"
                >
                  <Subhead weight="regular">
                    <div>· Начало разработки вакцины: {stat.startAt ? getDate(stat.startAt) : 0}</div>
                    <div>· Разработано: {stat.record && locale(stat.record) || 0}</div>
                    <div>· Спасено друзей: {stat.saveFriends && stat.saveFriends || 0}</div>
                    <div>· Получено вакцины от друзей: {stat.transfer && locale(stat.transfer) || 0}</div>
                    <div>· Произведено улучшений: {stat.improvements && locale(stat.improvements) || 0}</div>
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
              <Spinner />
            </Div>
          )}
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
