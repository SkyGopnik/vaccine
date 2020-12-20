import React from 'react';
import {
  ConfigProvider,
  Root,
  Epic
} from '@vkontakte/vkui';

import GameView from '../views/GameContainer';
import TabbarLight from "src/components/TabbarLight/TabbarLightContainer";

import unixTime from '../functions/unixtime';

import { AppReducerIterface } from "src/store/app/reducers";

import '../styles/all.scss';

let historyDelay = Number(new Date().getTime() / 1000);

interface IProps extends AppReducerIterface {}

interface IState {
  scheme: 'client_light' | 'client_dark' | 'space_gray' | 'bright_light'
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      scheme: 'bright_light'
    };

    this.menu = this.menu.bind(this);
  }

  componentDidMount() {
    // Навешиваем обработчик кнопку вперёд/назад
    window.addEventListener('popstate', (e) => {
      // Отменяем стандартное событие
      e.preventDefault();
      // Выполняем наш переход внутри приложения
      this.menu(e);
    });

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
  }

  menu = (e) => {
    const { changeViewPanelStory } = this.props;
    // Если история переходов существует
    if (e.state) {
      // Отменяем стандартное событие
      e.preventDefault();

      const { view, panel, story } = e.state;

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
    const { view, story, changeStory } = this.props;
    const { scheme } = this.state;

    return (
      <ConfigProvider
        scheme={scheme}
      >
        <Root activeView={view}>
          <Epic
            id="main"
            activeStory={story}
            tabbar={
              <TabbarLight />
            }
          >
            <GameView id="game" />
          </Epic>
        </Root>
      </ConfigProvider>
    );
  }
}
