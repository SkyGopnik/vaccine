import React, {ReactNode} from "react";
import axios from "axios";
import bridge from '@vkontakte/vk-bridge';
import {config} from 'src/js/config';
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
  changeModal(modal: string | null, modalData?: Object),
  changePanel(panel: string, panelData?: any)
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
      const { access_token } = await bridge.send("VKWebAppGetAuthToken", {"app_id": config.appId, "scope": "friends"});
      const { response } = await bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "params": {"fields": "photo_200,sex", "v":"5.130", "access_token": access_token}});
      const { data } = await axios.post('/user/list/check', {
        users: response.items.map((item) => String(item.id))
      });

      this.setState({
        friends: data
      });
    } catch (e) {
      console.log(e);
      window.history.back();
    }
  }

  render() {
    const {
      id,
      snackbar,
      changeModal,
      changePanel
    } = this.props;
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
                    before={
                      <Avatar
                        size={48}
                        src={item.photo}
                        onClick={() => changePanel('user', item)}
                      />
                    }
                    after={
                      <IconButton
                        icon={<Icon28MoneySendOutline />}
                        onClick={() => changeModal('transferMoney', {
                          ...item,
                          userType: 'friend'
                        })}
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
                  className={style.placeholder}
                  icon={<Icon56UserAddOutline />}
                  header="Спаси своих друзей!"
                  action={
                    <Button
                      size="l"
                      onClick={() => changePanel('ref')}
                      stretched
                    >
                      Спасти друзей
                    </Button>
                  }
                >
                  Похоже, твои друзья ещё не присоединились к игре, но ты можешь это исправить
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
