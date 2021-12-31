import React, {ReactNode} from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  SimpleCell,
  Avatar,
  IconButton,
  Spinner,
  Tabs,
  TabsItem,
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
  type: 'scientists' | 'hospitals'
  ptr: boolean
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      type: 'scientists',
      ptr: false
    };
  }

  async componentDidMount() {
    const { getRating } = this.props;

    await getRating();
  }

  changeType(type: IState["type"]) {
    const { getRating } = this.props;

    getRating({ loading: true, type });

    this.setState({
      type
    });
  }

  async onRefresh() {
    const { getRating, sendWsMessage } = this.props;

    this.setState({ ptr: true });

    setTimeout(async () => {
      await getRating();

      sendWsMessage({
         type: 'SyncUser'
      });

      this.setState({ ptr: false })
    }, 1000);
  }

  render() {
    const {
      id,
      user,
      list,
      snackbar,
      changePanel,
      changeModal
    } = this.props;
    const { type, ptr } = this.state;

    const tabs: Array<{
      key: IState["type"],
      name: string
    }> = [
      {
        key: 'scientists',
        name: 'Доктора'
      },
      {
        key: 'hospitals',
        name: 'Больницы'
      }
    ];

    return (
      <Panel id={id} className={style.rating}>
        <PanelHeader separator={false}>
          Рейтинг
        </PanelHeader>
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
          <Tabs>
            {tabs.map((item, index) => (
              <TabsItem
                key={index}
                selected={type === item.key}
                onClick={() => this.changeType(item.key)}
              >
                {item.name}
              </TabsItem>
            ))}
          </Tabs>
          <Div>
            <Card
              className={style.card}
              mode="shadow"
            >
              {type === 'scientists' && (
                !list.loading && list.data ? list.data.map((item, index) => (
                  <div className={style.userItem} key={index}>
                    <div className={style.topNumber}>{index + 1}.</div>
                    <SimpleCell
                      before={
                        <Avatar
                          className={style.avatar}
                          size={48}
                          src={item.user.info.photo}
                        >
                          <div className="status-wrapper" onClick={() => changePanel('user', item)}>
                            <div className="status">{item.user.status && item.user.status.code}</div>
                          </div>
                        </Avatar>
                      }
                      after={(item.userId !== user.id) && (
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
                      <div className={style.name} onClick={() => changePanel('user', item)}>
                        {item.user.info.firstName} {item.user.info.lastName}
                      </div>
                    </SimpleCell>
                  </div>
                )) : (
                  <Div>
                    <Spinner />
                  </Div>
                )
              )}
              {type === 'hospitals' && (
                !list.loading && list.data ? list.data.map((item, index) => (
                  <div className={style.userItem} key={index}>
                    <div className={style.topNumber}>{index + 1}.</div>
                    <SimpleCell
                      key={index}
                      before={
                        <Avatar
                          className={style.avatar}
                          size={48}
                          src={item.info.photo}
                        />
                      }
                      description={locale(item.balance)}
                      multiline
                      disabled
                    >
                      <div className={style.name}>
                        {item.info.name}
                      </div>
                    </SimpleCell>
                  </div>
                )) : (
                  <Div>
                    <Spinner />
                  </Div>
                )
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
