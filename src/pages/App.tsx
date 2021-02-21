import React from 'react';
import axios from 'axios';
import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ConfigProvider, Epic, Root} from '@vkontakte/vkui';
import { isMobile } from "react-device-detect";

import Rating from "src/views/Rating/RatingContainer";
import Game from 'src/views/Game/GameContainer';
import Profile from "src/views/Profile/ProfileContainer";
import Onboard from "src/views/Onboard";
import Loading from "src/views/Loading";
import Error from "src/views/Error";

import TabbarLight from "src/components/TabbarLight/TabbarLightContainer";
import Modals from "src/components/Modals/ModalsContainer";

import unixTime from '../functions/unixtime';
import queryGet from '../functions/query_get';

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";

import {config} from 'src/js/config';

import '../styles/all.scss';
import WrongOrientation from "src/views/WrongOrientation";

let historyDelay = Number(new Date().getTime() / 1000);

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  getUser(),
  syncUser(data: object),
  wsLoading: boolean,
  wsError: any,
  wsData: null | object
}

interface IState {
  scheme: AppearanceSchemeType,
  isHorizontal: boolean
}

let isExit;

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      scheme: 'bright_light',
      isHorizontal: false
    };

    this.menu = this.menu.bind(this);
  }

  async componentDidMount() {
    const {
      changeView,
      connectWs,
      syncUser,
      view
    } = this.props;

    try {
      const { data } = await axios.get('/user');

      syncUser(data);
      await connectWs(config.wsUrl);
    } catch (e) {
      changeView('error');
    }

    if (window.matchMedia("(orientation: landscape)").matches && isMobile) {
      console.log(view);
      console.log('Экран уже в горизонтальном режиме');
      changeView('wrongOrientation');

      this.setState({
        isHorizontal: true
      });
    }

    // Навешиваем обработчик кнопку вперёд/назад
    window.addEventListener('popstate', (e) => {
      // Отменяем стандартное событие
      e.preventDefault();
      // Выполняем наш переход внутри приложения
      this.menu(e);
    });

    // Тема приложения
    const vars = [
      '--button_secondary_foreground',
      '--accent',
      '--tabbar_active_icon',
      '--header_tint',
      '--button_primary_background',
      '--action_sheet_action_foreground'
    ];
    const color = '#6A9EE5';

    vars.forEach((name) => document.documentElement.style.setProperty(name, color));

    document.documentElement.style.setProperty('--background_content', '#F8FCFE');
    document.documentElement.style.setProperty('--header_background', '#F8FCFE');

    window.addEventListener("orientationchange", (e) => {
      const { isHorizontal } = this.state;

      if (!isHorizontal) {
        // Поворот в горизонтальный режим
        console.log('Поворот в горизонтальный режим');
        changeView('wrongOrientation');
      } else {
        // Возврат в вертикальный
        console.log('Возврат в вертикальный');
        changeView('main');
      }

      this.setState({
        isHorizontal: !isHorizontal
      });
    }, false);
  }

  menu = (e) => {
    const {
      view,
      changeModal,
      updateHistory,
      changeViewPanelStory
    } = this.props;

    // Если история переходов существует
    if (e.state) {
      const {view, panel, story, modal, modalData} = e.state;
      const currentView = this.props.view;

      if (currentView !== 'error') {
        // Отменяем стандартное событие
        e.preventDefault();

        console.log('------------------'+modal);

        changeModal(modal, modalData ? JSON.parse(modalData) : null, true);

        // Устанавливаем новые значения для View и Panel
        changeViewPanelStory(view, panel, story, null, true);
      }
    } else {
      changeViewPanelStory('main', 'main', 'game', null, true);
    }
  }

  render() {
    const { view, story } = this.props;
    const { scheme } = this.state;

    return (
      <ConfigProvider
        scheme={scheme}
        // platform={queryGet('reglis_platform') === 'web' ? Platform.VKCOM : undefined}
        transitionMotionEnabled={false}
      >
        <AdaptivityProvider>
          <AppRoot>
            <Root
              activeView={view}
              modal={<Modals />}
            >
              <Epic
                id="main"
                activeStory={story}
                tabbar={<TabbarLight />}
              >
                <Rating id="rating" />
                <Game id="game" />
                <Profile id="profile" />
              </Epic>
              <Onboard id="onboard" />
              <Loading id="loading" />
              <Error id="error" />
              <WrongOrientation id="wrongOrientation" />
            </Root>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    );
  }
}
