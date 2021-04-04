import React from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  SimpleCell,
  Avatar,
  IconButton,
} from '@vkontakte/vkui';

import {Icon28MoneySendOutline} from "@vkontakte/icons";

import style from './Users.scss';


interface IState {
  id: string
}

export default class extends React.Component<IState> {

  render() {
    const { id } = this.props;

    return (
      <Panel id={id} className={style.users}>
        <PanelHeader separator={false}>
          Пользователи
        </PanelHeader>
          <Div>
            <Card
              className={style.card}
              mode="shadow"
            >
                <div className={style.usersItem}>
                  <SimpleCell
                    target="_blank"
                    //href={`https://vk.com/`} 
                    before={
                      <Avatar
                        size={48}
                      />
                    }
                    after={
                      <IconButton
                        icon={<Icon28MoneySendOutline />}
                      />
                    }
                  >
                    Имя фамилия_1
                  </SimpleCell>
                </div>
                <div className={style.usersItem}>
                  <SimpleCell
                    target="_blank"
                    //href={`https://vk.com/`} 
                    before={
                      <Avatar
                        size={48}
                      />
                    }
                    after={
                      <IconButton
                        icon={<Icon28MoneySendOutline />}
                      />
                    }
                  >
                    Имя фамилия_2
                  </SimpleCell>
                </div>
                <div className={style.usersItem}>
                  <SimpleCell
                    target="_blank"
                    //href={`https://vk.com/`} 
                    before={
                      <Avatar
                        size={48}
                      />
                    }
                    after={
                      <IconButton
                        icon={<Icon28MoneySendOutline />}
                      />
                    }
                  >
                    Имя фамилия_3
                  </SimpleCell>
                </div>
            </Card>
          </Div>
      </Panel>
    );
  }
}
