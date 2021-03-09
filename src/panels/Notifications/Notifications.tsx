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
  Button, IconButton
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import getNotifications from "src/functions/getNotifications";

import {UserInfoInterface} from "src/store/user/reducers";

import style from "./Notifications.scss";
import {Icon28MoneySendOutline} from "@vkontakte/icons";

interface Notification {
  title: string,
  text: ReactNode,
  photo: string,
  isNew: boolean,
  isRepeat: boolean,
  time: string,
  user?: UserInfoInterface
}

interface IProps {
  id: string,
  snackbar: ReactNode | null,
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean)
}

interface IState {
  notifications: Array<Notification> | null
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      notifications: null
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('/user/notifications');

   this.setState({
     notifications: data.map((item) => getNotifications(item))
   });
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
    const { id, snackbar } = this.props;
    const { notifications } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          События
        </PanelHeader>
        {notifications ? (
          <>
            {notifications.filter((item) => item.isNew).length !== 0 && (
              <Div className={style.block}>
                <Header mode="secondary">Новые</Header>
                {notifications.filter((item) => item.isNew).map((item, index) => (
                  this.notification(item, index)
                ))}
              </Div>
            )}
            {notifications.filter((item) => !item.isNew).length !== 0 && (
              <Div className={style.block}>
                <Header mode="secondary">Все события</Header>
                {notifications.filter((item) => !item.isNew).map((item, index) => (
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
        {snackbar}
      </Panel>
    );
  }
}
