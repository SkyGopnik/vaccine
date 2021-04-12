import React from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  SimpleCell,
  Avatar
} from '@vkontakte/vkui';

import HistoryBackBtn from "src/components/HistoryBackBtn";

import style from './Users.scss';


interface IState {
  id: string
}

export default class extends React.Component<IState> {

  render() {
    const { id } = this.props;

    return (
      <Panel id={id} className={style.users}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Пользователи
        </PanelHeader>
          <Div>
            <Card
              className={style.card}
              mode="shadow"
            >
                <div className={style.usersItem}>
                  <SimpleCell
                    disabled
                    target="_blank"
                    //href={`https://vk.com/`} 
                    before={
                      <Avatar
                        size={48}
                      />
                    }
                  >
                    Имя фамилия_1
                  </SimpleCell>
                </div>
                <div className={style.usersItem}>
                  <SimpleCell
                    disabled
                    target="_blank"
                    //href={`https://vk.com/`} 
                    before={
                      <Avatar
                        size={48}
                      />
                    }
                  >
                    Имя фамилия_2
                  </SimpleCell>
                </div>
                <div className={style.usersItem}>
                  <SimpleCell
                    disabled
                    target="_blank"
                    //href={`https://vk.com/`} 
                    before={
                      <Avatar
                        size={48}
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
