import React, {ReactNode} from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Card,
  Div,
  SimpleCell,
  Switch, Snackbar, Avatar, Text, Button
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Promocode from "src/components/Promocode/PromocodeContainer";

import {UserInterface} from "src/store/user/reducers";

import style from "./Settings.scss";
import {Icon16Done, Icon24WriteOutline} from "@vkontakte/icons";
import {locale} from "src/functions/balanceFormat";
import Decimal from "decimal.js";
import Spacing from "src/components/Spacing";

interface IProps {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode | null,
  changeAdditional(data: object),
  changePanel(panel: string, panelData?: any),
  changeSnackbar(snackbar: ReactNode),
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean)
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      id,
      user,
      snackbar,
      changePanel,
      changeSnackbar,
      changeAdditional,
      changeModal
    } = this.props;
    const { easyAnimation, showRating } = user.data.additional;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Настройки
        </PanelHeader>
        <Div className={style.block}>
          <Header mode="secondary">Промокод</Header>
          <Card mode="shadow">
            <Promocode />
          </Card>
        </Div>
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
            {/*<SimpleCell*/}
            {/*  expandable*/}
            {/*  indicator="Name"*/}
            {/*  onClick={() => changePanel('linkedGroup')}*/}
            {/*>*/}
            {/*  Сообщество*/}
            {/*</SimpleCell>*/}
            <SimpleCell
              onClick={() => changePanel('donate')}
            >
              Магазин
            </SimpleCell>
            <SimpleCell onClick={() => changePanel('admin')}>
              Будка бомжа
            </SimpleCell>
            <SimpleCell onClick={() => changePanel('tasks')}>
              Задания
            </SimpleCell>
            <SimpleCell
              onClick={() => {
                changeSnackbar(
                  <Snackbar
                    className="success-snack"
                    layout="vertical"
                    duration={10000000}
                    onClose={() => changeSnackbar(null)}
                    before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
                  >
                    Я туточки
                  </Snackbar>
                );
              }}
            >
              Бесконечный снекбар
            </SimpleCell>
          </Card>
          <Spacing size={55} />
        </Div>
        {snackbar}
      </Panel>
    );
  }
}
