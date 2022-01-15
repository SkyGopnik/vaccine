import React, { ReactNode } from 'react';
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
  PullToRefresh, Placeholder, Button
} from '@vkontakte/vkui';

import {Icon28MoneySendOutline, Icon56UsersOutline} from "@vkontakte/icons";

import Spacing from "src/components/Spacing";

import {RatingReducerInterface} from "src/store/rating/reducers";
import {UserDataInterface, UserInterface} from "src/store/user/reducers";

import {locale} from "src/functions/balanceFormat";

import style from './index.module.scss';
import bridge from "@vkontakte/vk-bridge";

import {Swipeable} from 'react-swipeable';

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
  type: 'scientists' | 'laboratories'
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
    const { type } = this.state;

    await getRating({ loading: true, type });
  }

  changeType(type: IState["type"]) {
    const {rating, getRating} = this.props;

    if (rating.loading) {
      return;
    }

    getRating({loading: true, type});

    this.setState({
      type
    });
  }

  addToCommunity() {
    return bridge.send("VKWebAppAddToCommunity");
  }

  async onRefresh() {
    const { getRating, sendWsMessage } = this.props;
    const { type } = this.state;

    this.setState({ ptr: true });

    setTimeout(async () => {
      await getRating({ loading: false, type });

      sendWsMessage({
        type: 'SyncUser'
      });

      this.setState({ptr: false})
    }, 1000);
  }

  openLaboratory(id) {
    const link = document.createElement('a');
    link.href = 'https://vk.com/club' + id;
    link.target = "_blank";
    link.click();
  }

  swipe(motion: 'left' | 'right') {
    const {type} = this.state;

    if (motion === 'left') {
      this.changeType(type === 'laboratories' ? 'scientists' : 'laboratories');
    } else if (motion === 'right' || type === 'laboratories') {
      this.changeType(type === 'scientists' ? 'laboratories' : 'scientists');
    }
  }

  render() {
    const {
      id,
      user,
      rating,
      snackbar,
      changePanel,
      changeModal
    } = this.props;
    const {type, ptr} = this.state;

    const tabs: Array<{
      key: IState["type"],
      name: string
    }> = [
      {
        key: 'scientists',
        name: 'Учёные'
      },
      {
        key: 'laboratories',
        name: 'Лаборатории'
      }
    ];

    return (
      <Panel id={id} className={style.rating}>
        <PanelHeader separator={false}>
          Рейтинг
        </PanelHeader>
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
          <Swipeable
            onSwipedLeft={() => this.swipe('left')}
            onSwipedRight={() => this.swipe('right')}
          >
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
                  !rating.loading && rating.data.scientists ? rating.data.scientists.list.map((item, index) => (
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
                              {item.user.status && <div className="status">{item.user.status.code}</div>}
                            </div>
                          </Avatar>
                        }
                        after={(item.userId !== user.id) && (
                          <IconButton
                            className={style.transferIcon}
                            icon={<Icon28MoneySendOutline/>}
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
                      <Spinner/>
                    </Div>
                  )
                )}
                {type === 'laboratories' && (
                  !rating.loading ? (
                    rating.data.laboratories.length !== 0 ? (
                      rating.data.laboratories.map((item, index) => (
                        <div className={style.userItem} key={index}>
                          <div className={style.topNumber}>{index + 1}.</div>
                          <SimpleCell
                            key={index}
                            before={
                              <Avatar
                                className={style.avatar}
                                size={48}
                                src={item.group.info.photo}
                                onClick={() => this.openLaboratory(item.groupId)}
                              />
                            }
                            description={locale(item.balance)}
                            multiline
                            disabled
                          >
                            <div className={style.name} onClick={() => this.openLaboratory(item.groupId)}>
                              {item.group.info.name}
                            </div>
                          </SimpleCell>
                        </div>
                      ))
                    ) : (
                      <Placeholder
                        icon={<Icon56UsersOutline/>}
                        header="Лаборатории отсутсвуют"
                        action={<Button size="m" onClick={this.addToCommunity}>Подключить</Button>}
                      >
                        Подключите Вакцину в свое сообщество, чтобы оно появилось в рейтинге
                      </Placeholder>
                    )
                  ) : (
                    <Div>
                      <Spinner/>
                    </Div>
                  )
                )}
              </Card>
              <Spacing size={140}/>
            </Div>
          </Swipeable>
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
