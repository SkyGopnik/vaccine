import React, {ReactNode} from "react";
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

import style from "./Admin.scss";

interface IProps {
  id: string,
  snackbar: ReactNode | null,
  changePanel(panel: string, panelData?: any),
  changeSnackbar(snackbar: ReactNode | null),
  changeModal(modal: null | string, modalData?: any)
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      id,
      snackbar,
      changePanel
    } = this.props;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Будка бомжа
        </PanelHeader>
        <Div className={style.block}>
          <Header mode="secondary">Промокоды</Header>
          <Card mode="shadow">
            <SimpleCell onClick={() => changePanel('donate')}>
              Добавить
            </SimpleCell>
          </Card>
        </Div>
        {snackbar}
      </Panel>
    );
  }
}
