import React from 'react';
import {
  Button,
  Tabbar,
  Div,
  SimpleCell,
  Avatar,
  IconButton
} from '@vkontakte/vkui';

import {
  Icon28GameOutline,
  Icon28PollSquareOutline,
  Icon28Profile,
  Icon28ShareOutline
} from "@vkontakte/icons";

import TabbarItemLight from '../TabbarItemLight.jsx';

import {AppReducerInterface} from "src/store/app/reducers";

import style from './TabbarLight.scss';

interface IProps extends AppReducerInterface {}

interface IState {
  tabbarItems: Array<{
    name: string,
    icon: React.ReactNode
  }>
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      tabbarItems: [
        {
          name: 'rating',
          icon: <Icon28PollSquareOutline />
        },
        {
          name: 'game',
          icon: <Icon28GameOutline />
        },
        {
          name: 'profile',
          icon: <Icon28Profile />
        }
      ]
    };
  }

  render() {
    const { panel, story, changeStory, changePanel } = this.props;
    const { tabbarItems } = this.state;

    return (
      <Tabbar>
        {(story === 'rating' && panel === 'main') && (
          <div className={style.userItem}>
            <div className={style.topNumber}>15k</div>
            <SimpleCell
              target="_blank"
              href={`https://vk.com/skgopnik`}
              before={<Avatar size={48} src="https://sun9-61.userapi.com/O-2f7t0yecmx38WXoF37RkhkJTG2rcjL4Yq88w/J39s0u1f90c.jpg?ava=1" />}
              after={<IconButton icon={<Icon28ShareOutline />} />}
              description="21354562478,31"
              multiline
              disabled
            >
              Антон Иванков
            </SimpleCell>
          </div>
        )}
        {(story === 'game' && panel === 'main') && (
          <Div className={style.button}>
            <Button
              size="m"
              mode="outline"
              onClick={() => changePanel('improvements')}
              stretched
            >
              Улучшения
            </Button>
          </Div>
        )}
        <Div className={style.items}>
          {tabbarItems.map((item) => (
            <TabbarItemLight
              key={item.name}
              name={item.name}
              icon={item.icon}
              activeStory={story}
              changeStory={(e) => changeStory(e.currentTarget.dataset.story)}
            />
          ))}
        </Div>
      </Tabbar>
    );
  }
}
