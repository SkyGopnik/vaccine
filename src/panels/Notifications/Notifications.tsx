import React, {ReactNode} from "react";
import axios from "axios";
import {
  Panel,
  PanelHeader,
  Header,
  Card,
  Div,
  Avatar,
  Text,
  Caption,
  Headline,
  Spinner,
  IconButton, PullToRefresh
} from "@vkontakte/vkui";

import { Icon28MoneySendOutline } from "@vkontakte/icons";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import {Notification, NotificationsReducerInterface} from "src/store/notifications/reducers";

import style from "./Notifications.scss";

interface IProps extends NotificationsReducerInterface {
  id: string,
  snackbar: ReactNode | null,
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean)
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
    const { getNotifications } = this.props;

    await getNotifications();
  }

  async onRefresh() {
    const { getNotifications } = this.props;

    this.setState({ ptr: true });

    setTimeout(async () => {
      await getNotifications(false);

      this.setState({ ptr: false })
    }, 1000);
  }

  notification(item: Notification, index: number) {
    const { changeModal } = this.props;

    return (
      <Card
        className={style.card}
        key={index}
        mode="shadow"
      >
        <Avatar src={item.photo} size={48} />
        <div className={style.info}>
          <div className={style.content}>
            <Headline weight="regular">{item.title}</Headline>
            <Text weight="regular">{item.text}</Text>
            <Caption level="2" weight="regular">{item.time}</Caption>
          </div>
          {item.isRepeat && (
            <IconButton
              icon={<Icon28MoneySendOutline />}
              onClick={() => changeModal('transferMoney', item.user)}
            />
          )}
        </div>
      </Card>
    );
  }

  render() {
    const {
      id,
      snackbar,
      data,
      loading
    } = this.props;
    const { ptr } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          События
        </PanelHeader>
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
          {!loading ? (
            <>
              {data.filter((item) => item.isNew).length !== 0 && (
                <Div className={style.block}>
                  <Header mode="secondary">Новые</Header>
                  {data.filter((item) => item.isNew).map((item, index) => (
                    this.notification(item, index)
                  ))}
                </Div>
              )}
              {data.filter((item) => !item.isNew).length !== 0 && (
                <Div className={style.block}>
                  <Header mode="secondary">Все события</Header>
                  {data.filter((item) => !item.isNew).map((item, index) => (
                    this.notification(item, index)
                  ))}
                </Div>
              )}
            </>
          ) : (
            <Div>
              <Card className={style.card} mode="shadow">
                <Spinner />
              </Card>
            </Div>
          )}
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
