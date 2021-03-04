import React, {ReactNode} from "react";
import bridge from '@vkontakte/vk-bridge';
import {
  Card,
  Div,
  Panel,
  PanelHeader,
  SimpleCell,
  Avatar,
  IconButton,
  Spinner,
  Cell,
  List,
  Placeholder,
  Button
} from "@vkontakte/vkui";
import { Icon28MoneySendOutline, Icon56UserAddOutline } from "@vkontakte/icons";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import style from "./Friends.scss";

interface IProps {
  id: string,
  snackbar: ReactNode | null,
  changeModal(modal: string | null, modalData?: Object)
}

interface IState {
  friends: Array<{
    userId: string,
    firstName: string,
    lastName: string,
    photo: string,
    sex: 0 | 1 | 2
  }> | null
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      friends: null
    };
  }

  async componentDidMount() {
    try {
      const { access_token } = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7704696, "scope": "friends"});
      const { response } = await bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "params": {"fields": "photo_200,sex", "v":"5.130", "access_token": access_token}});
      const appFriends = await bridge.send("VKWebAppCallAPIMethod", {"method": "friends.getAppUsers", "params": {"v":"5.130", "access_token": access_token}});

      const friends = [];

      response.items.forEach((item) => {
        if (appFriends.response.indexOf(item.id) !== -1) {
          friends.push({
            userId: item.id,
            firstName: item.first_name,
            lastName: item.last_name,
            photo: item.photo_200,
            sex: item.sex
          });
        }
      });

      this.setState({
        friends: []
      });
    } catch (e) {
      console.log(e);
      window.history.back();
    }
  }

  render() {
    const { id, snackbar, changeModal } = this.props;
    const { friends } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Передача другу
        </PanelHeader>
        <Div>
          <Card
            className={style.card}
            mode="shadow"
          >
            {friends ? (
              friends.length !== 0 ? (
                friends.map((item, index) => (
                  <SimpleCell
                    key={index}
                    before={<Avatar size={48} src={item.photo} />}
                    after={
                      <IconButton
                        icon={<Icon28MoneySendOutline />}
                        onClick={() => changeModal('transferMoney', item)}
                      />
                    }
                    multiline
                    disabled
                  >
                    {item.firstName} {item.lastName}
                  </SimpleCell>
                ))
              ) : (
                <Placeholder
                  icon={<Icon56UserAddOutline />}
                  header="Спаси своих друзей!"
                  // action={<Button size="m">Спасти друзей</Button>}
                >
                  Похоже, твои друзья ещё не присоединилсь к игре, но ты можешь это исправить
                </Placeholder>
              )
            ) : (
              <Div>
                <Spinner />
              </Div>
            )}
          </Card>
        </Div>
        {snackbar}
      </Panel>
    );
  }
}