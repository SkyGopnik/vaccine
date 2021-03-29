import React, {ReactNode} from 'react';

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

import {ProfileReducerInterface} from "src/store/profile/reducers";

import Img5 from "src/img/profile/5.svg";
import Img6 from "src/img/profile/6.svg";

import style from './User.scss';

interface IProps extends ProfileReducerInterface {
  id: string,
  snackbar: ReactNode | null
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
    // const { getProfile } = this.props;

    // await getProfile();
  }

  async onRefresh() {
    // const { getProfile } = this.props;
    //
    // this.setState({ ptr: true });
    //
    // setTimeout(async () => {
    //   await getProfile(false);
    //
    //   this.setState({ ptr: false })
    // }, 1000);
  }

  render() {
    const { id, snackbar } = this.props;
    const { ptr } = this.state;

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
            <Avatar src="" size={72} />
            <Title level="3" weight="medium">test test2</Title>
            {'1' ? (
              <Caption level="1" weight="regular">1 место в рейтинге</Caption>
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
                <div>· 200/клик</div>
                <div>· 500/сек</div>
              </Subhead>
            </Card>
            <Card
              icon={<img src={Img5} alt="" />}
              title="Статистика"
            >
              <Subhead weight="regular">
                <div>· Начало разработки вакцины: 1</div>
                <div>· Разработано: 2</div>
                <div>· Получено вакцины от друзей: 3</div>
                <div>· Произведено улучшений: 4</div>
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
