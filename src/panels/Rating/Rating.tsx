import React, {ReactNode} from 'react';
import Decimal from 'decimal.js';
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  SimpleCell,
  Avatar,
  IconButton,
  Spinner,
  FormItem,
  FormStatus,
  PullToRefresh
} from '@vkontakte/vkui';

import {Icon28MoneySendOutline} from "@vkontakte/icons";

import Spacing from "src/components/Spacing";

import {RatingReducerInterface} from "src/store/rating/reducers";
import {UserDataInterface, UserInterface} from "src/store/user/reducers";

import { locale } from "src/functions/balanceFormat";

import style from './Rating.scss';

interface IProps extends RatingReducerInterface {
  id: string,
  snackbar: ReactNode | null,
  user: UserInterface | null,
  changeModal(modal: string | null, modalData?: Object),
  changeStory(story: string, panelData?: any),
  sendWsMessage(data: object),
  changePanel(panel: string, panelData?: any)
}

interface IState {
  ptr: boolean
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ptr: false
    };
  }

  async componentDidMount() {
    const { getRating } = this.props;

    await getRating();
  }

  async onRefresh() {
    const { getRating, sendWsMessage } = this.props;

    this.setState({ ptr: true });

    setTimeout(async () => {
      await getRating(false);

      sendWsMessage({
         type: 'SyncUser'
      });

      this.setState({ ptr: false })
    }, 1000);
  }

  openProfile(item: UserDataInterface) {
    const { user, changeStory, changePanel } = this.props;

    if (user.id !== item.userId) {
      changePanel('user', item);
    } else {
      changeStory('profile')
    }
  }

  render() {
    const {
      id,
      user,
      list,
      snackbar,
      changeModal,
      changePanel,
      changeStory
    } = this.props;
    const { ptr } = this.state;

    return (
      <Panel id={id} className={style.rating}>
        <PanelHeader separator={false}>
          Рейтинг
        </PanelHeader>
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
          {/*<Tabs>*/}
          {/*  <TabsItem selected>*/}
          {/*    Доктора*/}
          {/*  </TabsItem>*/}
          {/*  <TabsItem>*/}
          {/*    Больницы*/}
          {/*  </TabsItem>*/}
          {/*</Tabs>*/}
          {!list.loading && (new Decimal(user.data.balance).toNumber() !== (list.user && new Decimal(list.user.balance).toNumber())) && (
            <FormItem>
              <FormStatus header="Данные отличаются" mode="error">
                Рейтинг может отображаться неточно, ты можешь обновить страницу, чтобы это исправить
              </FormStatus>
            </FormItem>
          )}
          <Div>
            <Card
              className={style.card}
              mode="shadow"
            >
              {list.data ? list.data.map((item, index) => (
                <div className={style.userItem} key={index}>
                  <div className={style.topNumber}>{index + 1}.</div>
                  <SimpleCell
                    before={
                      <Avatar
                        className={style.avatar}
                        size={48}
                        src={item.user.info.photo}
                        onClick={() => this.openProfile(item)}
                      />
                    }
                    after={(item.userId !== list.user.userId) && (
                      <IconButton
                        className={style.transferIcon}
                        icon={<Icon28MoneySendOutline />}
                        onClick={() => changeModal('transferMoney', item.user.info)}
                      />
                    )}
                    description={locale(item.balance)}
                    multiline
                    disabled
                  >
                    <div className={style.name} onClick={() => this.openProfile(item)}>{item.user.info.firstName} {item.user.info.lastName}</div>
                  </SimpleCell>
                </div>
              )) : (
                <Div>
                  <Spinner />
                </Div>
              )}
            </Card>
            <Spacing size={140} />
          </Div>
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
