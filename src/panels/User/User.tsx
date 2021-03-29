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
  PullToRefresh
} from '@vkontakte/vkui';

import Card from 'src/components/Card/Card';
import HistoryBackBtn from "src/components/HistoryBackBtn";

import balanceFormat, {locale} from "src/functions/balanceFormat";
import getDate from "src/functions/getDate";

import {ProfileReducerInterface} from "src/store/profile/reducers";
import {UserDataInterface} from "src/store/user/reducers";

import Img5 from "src/img/profile/5.svg";
import Img6 from "src/img/profile/6.svg";

import style from './User.scss';

interface IProps extends ProfileReducerInterface {
  id: string,
  snackbar: ReactNode | null,
  panelData: any
}

interface IState {
  ptr: boolean,
  data: UserDataInterface | null,
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
      ptr: false,
      data: null,
      stat: {}
    };
  }

  async componentDidMount() {
    const { panelData } = this.props;

    this.setState({
      data: panelData
    });

    const { data } = await axios.get(`/user/profile/${panelData.userId}`);

    this.setState({
      data: data.data,
      stat: data.stat
    });
  }

  async onRefresh() {
    const { panelData } = this.props;

    this.setState({ ptr: true });

    setTimeout(async () => {
      const { data } = await axios.get(`/user/profile/${panelData.userId}`);

      this.setState({
        data: data.data,
        stat: data.stat,
        ptr: false
      });
    }, 1000);
  }

  render() {
    const { id, snackbar } = this.props;
    const { ptr, data, stat } = this.state;

    const { click, passive } = data || {};
    const { firstName, lastName, photo } = data && data.user.info || {};

    return (
      <Panel id={id}>
        <PanelHeader
          left={<HistoryBackBtn />}
          separator={false}
        >
          Профиль
        </PanelHeader>
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
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
                <div>· Получено вакцины от друзей: {stat.transfer && locale(stat.transfer) || 0}</div>
                <div>· Произведено улучшений: {stat.improvements || 0}</div>
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
          </Div>
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
