import React from 'react';
import axios from 'axios';
import {AppearanceSchemeType} from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ConfigProvider, Epic, Root} from '@vkontakte/vkui';

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

let historyDelay = Number(new Date().getTime() / 1000);

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  getUser(),
  syncUser(data: object),
  wsLoading: boolean,
  wsError: any,
  wsData: null | object
}

interface IState {
  scheme: AppearanceSchemeType
}

let isExit;

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      scheme: 'bright_light'
    };

    this.menu = this.menu.bind(this);
  }

  async componentDidMount() {
    const {
      changeView,
      connectWs,
      syncUser
    } = this.props;

    // changeView('loading');

    try {
      const { data } = await axios.get('/user');

      syncUser(data);
      await connectWs(config.wsUrl);
    } catch (e) {
      changeView('error');
    }
    // getUser();
    // setTimeout(() => {
    //   changeView('onboard');
    // }, 5000);

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
  }

  menu = (e) => {
    const { changeViewPanelStory, changeModal } = this.props;

    console.log('backBug');
    // Если история переходов существует
    if (e.state) {
      // Отменяем стандартное событие
      e.preventDefault();

      const { view, panel, story, modal, modalData } = e.state;

      changeModal(modal, modalData ? JSON.parse(modalData) : null, true);

      console.log('backChangeModal', modal);

      if (historyDelay < unixTime()) {
        // Обновляем блокировку
        historyDelay = unixTime() + 1;

        // Устанавливаем новые значения для View и Panel
        changeViewPanelStory(view, panel, story);
      } else {
        changeViewPanelStory(view, panel, story);
      }
    } else {
      changeViewPanelStory('main', 'main', 'game');
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
            </Root>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    );
  }
}
