import React from 'react';
import Decimal from 'decimal.js';
import {
  Button,
  Tabbar,
  Div,
  SimpleCell,
  Avatar,
  IconButton
} from '@vkontakte/vkui';

import {
  Icon24MoneyTransferOutline,
  Icon28GameOutline,
  Icon28PollSquareOutline,
  Icon28Profile,
  Icon28ShareOutline
} from "@vkontakte/icons";

import TabbarItemLight from '../TabbarItemLight.jsx';

import declNum from "src/functions/decl_num";
import { locale } from "src/functions/balanceFormat";

import platformApi from "src/js/platformApi";

import {AppReducerInterface} from "src/store/app/reducers";
import {UserDataInterface, UserInterface} from "src/store/user/reducers";

import style from './TabbarLight.scss';
import {RandomUserReducerInterface} from "src/store/randomUser/reducers";

interface IProps extends AppReducerInterface {
  user: UserInterface,
  ratingUser: UserDataInterface | null,
  ratingLoading: boolean,
  profile: {
    ref: {
      refCode?: number,
      ref?: number
    }
  },
  randomUser: RandomUserReducerInterface
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
      profile,
      ratingUser,
      ratingLoading,
      randomUser,
      changeStory,
      changePanel,
      changeModal
    } = this.props;
    const { tabbarItems } = this.state;

    return (
      <Tabbar>
        {(story === 'rating' && panel === 'main') && ratingUser && (
          <div className={style.userItem}>
            <div className={style.topNumber}>{ratingUser.position.toFixed(0)}.</div>
            <SimpleCell
              target="_blank"
              href={`https://vk.com/skgopnik`}
              before={
                <Avatar
                  size={48}
                  src={ratingUser.user.info.photo}
                  onClick={() => changeStory('profile')}
                />
              }
              after={<IconButton icon={<Icon28ShareOutline />} onClick={() => platformApi.sharePost(`Я нахожусь на ${ratingUser.position} месте и уже накопил ${locale(ratingUser.balance)} ${new Decimal(ratingUser.balance).toNumber() > 1 ? declNum(Math.round(new Decimal(ratingUser.balance).toNumber()), ['вакцину', 'вакцины', 'вакцины']) : 'вакцины'}!`)} />}
              description={locale(ratingUser.balance)}
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
        {panel === 'user' && (
          <Div className={style.button}>
            <Button
              size="m"
              before={<Icon24MoneyTransferOutline />}
              onClick={() => changeModal('transferMoney', {
                backType: 'normal',
                ...randomUser.data.data.user.info
              })}
              disabled={randomUser.loading}
              stretched
            >
              Передать вакцину
            </Button>
          </Div>
        )}
        {(story === 'profile' && panel === 'ref') && (
          <Div className={style.button}>
            <Button
              size="m"
              onClick={() => platformApi.sharePost(`Присоединяйся к игре и получи дополнительный бонус используя мой реферальный код - ${profile.ref.refCode}`)}
              stretched
            >
              Поделиться приглашением
            </Button>
          </Div>
        )}
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
