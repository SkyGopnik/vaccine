import React from 'react';
import axios from 'axios';
import {Appearance, AppRoot, ConfigProvider, Epic, Root, Scheme} from '@vkontakte/vkui';

import RatingView from "src/views/Rating/RatingContainer";
import GameView from 'src/views/Game/GameContainer';
import ProfileView from "src/views/Profile/ProfileContainer";
import OnboardView from "src/views/Onboard";
import LoadingView from "src/views/Loading";
import ErrorView from "src/views/Error";
import WrongOrientationView from "src/views/WrongOrientation";

import TabbarLight from "src/components/TabbarLight/TabbarLightContainer";
import Modals from "src/components/Modals/ModalsContainer";
import platformApi from "src/js/platformApi";

import {AppReducerInterface} from "src/store/app/reducers";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";

import {config} from 'src/js/config';

import '../styles/all.scss';
import bridge from "@vkontakte/vk-bridge";

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  getUser(),
  syncUser(data: object),
  wsLoading: boolean,
  wsError: any,
  wsData: null | object
}

interface IState {
  lastView: string,
  scheme: Scheme
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      lastView: 'main',
      scheme: Scheme.BRIGHT_LIGHT
    };

    this.menu = this.menu.bind(this);
  }

  async componentDidMount() {
    const {
      changeView,
      connectWs,
      syncUser
    } = this.props;

    // Subscribe on events
    this.subscribe();

    try {
      const { data } = await axios.get('/user');

      syncUser(data);
      await connectWs(config.wsUrl);
    } catch (e) {
      changeView('error');
    }

    // Навешиваем обработчик кнопку вперёд/назад
    window.addEventListener('popstate', (e) => {
      // Отменяем стандартное событие
      e.preventDefault();
      // Выполняем наш переход внутри приложения
      this.menu(e);
    });

    this.updateSnackbarPadding();
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    const { snackbar, story, panel } = this.props;

    // Если меняется история
    // или если меняется панель
    // или если меняется сам снекбар
    if (
      prevProps.snackbar !== snackbar
      || prevProps.story !== story
      || prevProps.story === story && prevProps.panel !== panel
    ) {
      setTimeout(() => this.updateSnackbarPadding(), 250);
    }
  }

  subscribe() {
    bridge.subscribe(async (e: any) => {
      if (!e.detail) {
        return;
      }

      const { type, data } = e.detail;

      if (type === 'VKWebAppUpdateConfig') {
        let scheme = Scheme.BRIGHT_LIGHT;

        if (data.scheme === 'client_dark' || data.scheme === 'space_gray') {
          scheme = Scheme.SPACE_GRAY;
        }

        const appearance = {
          [Scheme.BRIGHT_LIGHT]: {
            status: Appearance.DARK,
            color: '#ffffff'
          },
          [Scheme.SPACE_GRAY]: {
            status: Appearance.LIGHT,
            color: '#19191a'
          }
        };

        platformApi.changeViewSettings(appearance[scheme].status, appearance[scheme].color);

        this.setState({
          scheme
        });
      }
    });
  }

  menu(e) {
    const {
      changeModal,
      changePopout,
      changeViewPanelStory
    } = this.props;

    const currentView = this.props.view;

    if (currentView === 'main') {
      // Если история переходов существует
      if (e.state) {
        const {view, panel, story, modal, data, modalData} = e.state;
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

        changePopout(null, true);

        // Устанавливаем новые значения для View и Panel
        changeViewPanelStory(view, panel, story, data ? JSON.parse(data) : null, true);
      } else {
        changeViewPanelStory('main', 'main', 'game', null, true);
      }
    }
  }

  updateSnackbarPadding() {
    const snackbar = document.querySelector<HTMLElement>('.vkuiSnackbar,.Snackbar');
    const tabbar = document.getElementById("tabbar");

    if (!snackbar) {
      return;
    }

    snackbar.style.paddingBottom = `calc(${tabbar.offsetHeight}px + var(--safe-area-inset-bottom))`;
  }

  render() {
    const { view, story, popout } = this.props;
    const { scheme } = this.state;

    return (
      <ConfigProvider
        scheme={scheme}
        transitionMotionEnabled={false}
      >
        <AppRoot>
          <Root
            activeView={view}
            modal={<Modals />}
            popout={popout}
          >
            <Epic
              id="main"
              activeStory={story}
              tabbar={<TabbarLight />}
            >
              <RatingView id="rating" />
              <GameView id="game" />
              <ProfileView id="profile" />
            </Epic>
            <OnboardView id="onboard" />
            <LoadingView id="loading" />
            <ErrorView id="error" />
            <WrongOrientationView id="wrongOrientation" />
          </Root>
        </AppRoot>
      </ConfigProvider>
    );
  }
}
