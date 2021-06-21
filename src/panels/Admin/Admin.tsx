import React, {ReactNode} from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Card,
  Div,
  SimpleCell, Snackbar, Avatar
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import style from "./Admin.scss";
import axios from "axios";
import {Icon16Cancel, Icon16Done} from "@vkontakte/icons";

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

  async dropLevel() {
    const { changeSnackbar } = this.props;

    try {
      await axios.delete('/admin/level');

      changeSnackbar(
        <Snackbar
          className="success-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        >
          <div>Уровни пользователей были обнулены</div>
        </Snackbar>
      );
    } catch (e) {
      changeSnackbar(
        <Snackbar
          className="error-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: 'var(--destructive)'}}><Icon16Cancel fill="#fff" width={14} height={14}/></Avatar>}
        >
          {e.response.data.message}
        </Snackbar>
      );
    }
  }

  render() {
    const {
      id,
      snackbar,
      changeModal,
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
            <SimpleCell onClick={() => changeModal('addPromocode')}>
              Добавить
            </SimpleCell>
          </Card>
        </Div>
        <Div className={style.block}>
          <Header mode="secondary">Пользователи</Header>
          <Card mode="shadow">
            <SimpleCell onClick={() => changePanel('adminRating')}>
              Рейтинг
            </SimpleCell>
            <SimpleCell onClick={() => changePanel('reports')}>
              Репорты
            </SimpleCell>
            <SimpleCell onClick={() => changeModal('editUserBan', 'pardon')}>
              Разблокировать
            </SimpleCell>
            <SimpleCell onClick={() => changeModal('editUserBan', 'ban')}>
              Заблокировать
            </SimpleCell>
            <SimpleCell onClick={() => this.dropLevel()}>
              Обнулить уровни
            </SimpleCell>
          </Card>
        </Div>
        <Div className={style.block}>
          <Header mode="secondary">Роли</Header>
          <Card mode="shadow">
            <SimpleCell onClick={() => changeModal('editRole')}>
              Изменить
            </SimpleCell>
          </Card>
        </Div>
        {snackbar}
      </Panel>
    );
  }
}
