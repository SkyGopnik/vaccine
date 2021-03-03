import React from 'react';
import Decimal from 'decimal';
import {
  Button,
  Tabbar,
  Div,
  SimpleCell,
  Avatar,
  IconButton,
  Headline
} from '@vkontakte/vkui';

import {
  Icon28GameOutline,
  Icon28PollSquareOutline,
  Icon28Profile,
  Icon28ShareOutline
} from "@vkontakte/icons";

import TabbarItemLight from '../TabbarItemLight.jsx';

import declNum from "src/functions/decl_num";

import {AppReducerInterface} from "src/store/app/reducers";
import {UserDataInterface, UserInterface} from "src/store/user/reducers";

import style from './TabbarLight.scss';
import platformApi from "src/js/platformApi";

interface IProps extends AppReducerInterface {
  user: UserInterface,
  ratingUser: UserDataInterface | null,
  ratingLoading: boolean
}

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
    const {
      panel,
      story,
      user,
      ratingUser,
      ratingLoading,
      changeStory,
      changePanel
    } = this.props;
    const { tabbarItems } = this.state;

    return (
      <Tabbar>
        {(story === 'rating' && panel === 'main') && (ratingUser && !ratingLoading) && (
          <div className={style.userItem}>
            <div className={style.topNumber}>{ratingUser.position.toFixed(0)}.</div>
            <SimpleCell
              target="_blank"
              href={`https://vk.com/skgopnik`}
              before={<Avatar size={48} src={ratingUser.user.info.photo} />}
              after={<IconButton icon={<Icon28ShareOutline />} onClick={() => platformApi.sharePost(`Я нахожусь на ${ratingUser.position} месте и уже накопил ${ratingUser.balance.toLocaleString()} ${declNum(Math.round(Decimal(ratingUser.balance).toNumber()), ['вакцину', 'вакцины', 'вакцины'])}!`)} />}
              description={ratingUser.balance.toLocaleString()}
              multiline
              disabled
            >
              {ratingUser.user.info.firstName} {ratingUser.user.info.lastName}
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
        {/*{(story === 'game' && panel === 'improvements') && user && (*/}
        {/*  <Headline className={style.balance} weight="medium"><div>У вас {user.data.balance}</div> <MainIcon /></Headline>*/}
        {/*)}*/}
        <div className={style.items}>
          {tabbarItems.map((item) => (
            <TabbarItemLight
              key={item.name}
              name={item.name}
              icon={item.icon}
              activeStory={story}
              changeStory={(e) => changeStory(e.currentTarget.dataset.story)}
            />
          ))}
        </div>
      </Tabbar>
    );
  }
}
