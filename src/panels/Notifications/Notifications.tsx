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
  Headline, Spinner
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import getNotifications from "src/functions/getNotifications";

import style from "./Notifications.scss";

interface Notification {
  title: string,
  text: ReactNode,
  photo: string,
  isNew: boolean,
  time: string
}

interface IProps {
  id: string
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
    return (
      <Card
        className={style.card}
        key={index}
        mode="shadow"
      >
        <Avatar src={item.photo} size={48} />
        <div className={style.info}>
          <Headline weight="regular">{item.title}</Headline>
          <Text weight="regular">{item.text}</Text>
          <Caption level="2" weight="regular">{item.time}</Caption>
        </div>
      </Card>
    );
  }

  render() {
    const { id } = this.props;
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
      </Panel>
    );
  }
}
