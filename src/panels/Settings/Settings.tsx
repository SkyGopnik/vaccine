import React from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Card,
  Div,
  SimpleCell,
  Switch
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import {UserInterface} from "src/store/user/reducers";

import style from "./Settings.scss";

interface IProps {
  id: string,
  user: UserInterface | null,
  changeAdditional(data: object),
  changePanel(panel: string, panelData?: any),
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { id, user, changeAdditional, changePanel } = this.props;
    const { easyAnimation, showRating } = user.data.additional;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Настройки
        </PanelHeader>
        <Div className={style.block}>
          <Header mode="secondary">Оформление</Header>
          <Card mode="shadow">
            <SimpleCell
              after={
                <Switch
                  checked={easyAnimation || false}
                  onChange={() => changeAdditional({
                    easyAnimation: !easyAnimation
                  })}
                />
              }
              disabled
            >
              Упростить анимацию
            </SimpleCell>
            {/*<SimpleCell*/}
            {/*  after={<Switch defaultChecked />}*/}
            {/*  disabled*/}
            {/*>*/}
            {/*  Оформление*/}
            {/*</SimpleCell>*/}
          </Card>
        </Div>
        <Div className={style.block}>
          <Header mode="secondary">Аккаунт</Header>
          <Card mode="shadow">
            {/*<SimpleCell*/}
            {/*  after={<Switch disabled />}*/}
            {/*  disabled*/}
            {/*>*/}
            {/*  Push уведомления*/}
            {/*</SimpleCell>*/}
            <SimpleCell
              after={
                <Switch
                  checked={showRating || false}
                  onChange={() => changeAdditional({
                    showRating: !showRating
                  })}
                />
              }
              disabled
            >
              Отображение в рейтинге
            </SimpleCell>
            <SimpleCell
              expandable 
              indicator="Name"
              onClick={() => changePanel('linkedGroup')}
            >
              Сообщество
            </SimpleCell>
          </Card>
        </Div>
      </Panel>
    );
  }
}
