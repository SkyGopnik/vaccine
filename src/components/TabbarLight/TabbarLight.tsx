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

import { locale } from "src/functions/balanceFormat";

import platformApi from "src/js/platformApi";

import {AppReducerInterface} from "src/store/app/reducers";
import {UserDataInterface, UserInterface} from "src/store/user/reducers";
import {RandomUserReducerInterface} from "src/store/randomUser/reducers";

import style from './TabbarLight.scss';

interface IProps extends AppReducerInterface {
  user: UserInterface,
  ratingUserPosition: number,
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

    this.changeStory = this.changeStory.bind(this);
  }

  changeStory(e) {
    const { panel, story, changeStory } = this.props;

    const { dataset } = e.currentTarget;

    if (story === dataset.story && panel === 'main') {
      window.scroll({ top: 0, behavior: "smooth" });
      return;
    }

    window.scroll({ top: 0, behavior: "auto" });

    changeStory(dataset.story);
  }

  render() {
    const {
      panel,
      story,
      user,
      ratingUserPosition,
      randomUser,
      changeStory,
      changePanel,
      changeModal
    } = this.props;
    const { tabbarItems } = this.state;

    return (
      <Tabbar id="tabbar">
        {(story === 'rating' && panel === 'main') && user && ratingUserPosition && (
          <div className={style.userItem}>
            <div className={style.topNumber}>{ratingUserPosition.toFixed(0)}.</div>
            <SimpleCell
              target="_blank"
              before={
                <Avatar
                  size={48}
                  src={user.info.photo}
                >
                  <div className="status-wrapper" onClick={() => changeStory('profile')}>
                    <span className="status">{user.status && user.status.code}</span>
                  </div>
                </Avatar>
              }
              after={
                <IconButton
                  className={style.icon}
                  icon={<Icon28ShareOutline />}
                  onClick={() => platformApi.sharePost(`Я нахожусь на ${ratingUserPosition} месте и уже накопил ${locale(user.data.balance)} вакцины`)}
                />
              }
              description={locale(user.data.balance)}
              multiline
              disabled
            >
              {user.info.firstName} {user.info.lastName}
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
        {/*{(story === 'profile' && panel === 'ref') && (*/}
        {/*  <Div className={style.button}>*/}
        {/*    <Button*/}
        {/*      size="m"*/}
        {/*      onClick={() => platformApi.sharePost(`Присоединяйся к игре и получи дополнительный бонус используя мой реферальный код - ${profile.ref.refCode}`)}*/}
        {/*      stretched*/}
        {/*    >*/}
        {/*      Поделиться приглашением*/}
        {/*    </Button>*/}
        {/*  </Div>*/}
        {/*)}*/}
        <div className={style.items}>
          {tabbarItems.map((item) => (
            <TabbarItemLight
              key={item.name}
              name={item.name}
              icon={item.icon}
              activeStory={story}
              changeStory={this.changeStory}
            />
          ))}
        </div>
      </Tabbar>
    );
  }
}
