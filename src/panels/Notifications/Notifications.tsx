import React, {ReactNode} from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Card,
  Div,
  Avatar,
  Spinner,
  PullToRefresh,
  RichCell
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import {Notification, NotificationsReducerInterface} from "src/store/notifications/reducers";

import style from "./Notifications.scss";

interface IProps extends NotificationsReducerInterface {
  id: string,
  snackbar: ReactNode | null,
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean),
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
    const { changePanel } = this.props;

    console.log(item);

    return (
      <Card
        className={style.card}
        key={index}
        mode="shadow"
      >
        <RichCell
          before={
            <Avatar
              size={48}
              src={item.photo}
              onClick={() => changePanel('user', item.user)}
            />
          }
          text={item.text}
          caption={item.time}
          multiline
          disabled
        >
          {item.title}
        </RichCell>
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
