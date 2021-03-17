import React from 'react';
import axios from 'axios';
import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ConfigProvider, Epic, Platform, Root} from '@vkontakte/vkui';
import {isMobile} from "react-device-detect";

import Rating from "src/views/Rating/RatingContainer";
import Game from 'src/views/Game/GameContainer';
import Profile from "src/views/Profile/ProfileContainer";
import Onboard from "src/views/Onboard";
import Loading from "src/views/Loading";
import Error from "src/views/Error";
import WrongOrientation from "src/views/WrongOrientation";

import TabbarLight from "src/components/TabbarLight/TabbarLightContainer";
import Modals from "src/components/Modals/ModalsContainer";
import platformApi from "src/js/platformApi";

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";

import {config} from 'src/js/config';

import '../styles/all.scss';

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

interface Scheme {
  status: 'light' | 'dark',
  color: string
}

interface SchemeArray {
  bright_light: Scheme,
  space_gray: Scheme
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

    platformApi.changeViewSettings('dark', '#ffffff');

    if (window.matchMedia("(orientation: landscape)").matches && isMobile) {
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
      '--action_sheet_action_foreground',
      '--button_outline_border',
      '--button_outline_foreground'
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
      changeModal,
      changeViewPanelStory
    } = this.props;

    const currentView = this.props.view;

    if (currentView === 'main') {
      // Если история переходов существует
      if (e.state) {
        const {view, panel, story, modal, modalData} = e.state;
        // Отменяем стандартное событие
        e.preventDefault();

        console.log('popstate');

        /*
          В общем, в чём прикол этого бреда, когда мы возвращаемся назад,
          в прошлой модалке у нас может использоваться информация из modalData
          изменять modalData сразу нельзя, т.к. тогда на модалке которая закрывается
          будет undefined
          TODO: Как вариант сохранять modalData во внутреннее состояние модалки, чтобы избавить её от зависимости и предотварить баги
        */
        changeModal(null, undefined, true);
        setTimeout(() => changeModal(modal, modalData ? JSON.parse(modalData) : null, true), 400);

        // Устанавливаем новые значения для View и Panel
        changeViewPanelStory(view, panel, story, null, true);
      } else {
        changeViewPanelStory('main', 'main', 'game', null, true);
      }
    }
  }

  render() {
    const { view, story } = this.props;
    const { scheme } = this.state;

    return (
      <ConfigProvider
        scheme={scheme}
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
