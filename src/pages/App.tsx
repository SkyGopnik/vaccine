import React from 'react';
import axios from 'axios';
import eruda from 'eruda';
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Epic,
  Root, Scheme
} from '@vkontakte/vkui';

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

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  getUser(),
  syncUser(data: object),
  wsLoading: boolean,
  wsError: any,
  wsData: null | object
}

interface IState {
  lastView: string
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      lastView: 'main'
    };

    this.menu = this.menu.bind(this);
  }

  async componentDidMount() {
    const {
      changeView,
      connectWs,
      syncUser
    } = this.props;

    try {
      const { data } = await axios.get('/user');

      syncUser(data);
      await connectWs(config.wsUrl);
    } catch (e) {
      changeView('error');
    }

    platformApi.changeViewSettings('dark', '#ffffff');

    // Навешиваем обработчик кнопку вперёд/назад
    window.addEventListener('popstate', (e) => {
      // Отменяем стандартное событие
      e.preventDefault();
      // Выполняем наш переход внутри приложения
      this.menu(e);
    });

    this.updateTheme();

    this.updateSnackbarPadding();

    eruda.init();
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    const { panel, story } = this.props;

    // Если меняется история
    // или если меняется панель
    if (
      prevProps.story !== story
      || prevProps.story === story && prevProps.panel !== panel
    ) {
      // Задержка чтобы дерево успело отрендерится после изменения состояния
      setTimeout(() => this.updateSnackbarPadding(), 100);
    }
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

  updateTheme() {
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
  }

  updateSnackbarPadding() {
    const snackbar = document.querySelector<HTMLElement>('.Snackbar');
    const tabbar = document.getElementById("tabbar");

    if (!snackbar) {
      return;
    }

    snackbar.style.paddingBottom = `calc(${tabbar.offsetHeight}px + var(--safe-area-inset-bottom))`;
  }

  render() {
    const { view, story, popout } = this.props;

    return (
      <ConfigProvider
        scheme={Scheme.BRIGHT_LIGHT}
        transitionMotionEnabled={false}
      >
        <AdaptivityProvider>
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
        </AdaptivityProvider>
      </ConfigProvider>
    );
  }
}
