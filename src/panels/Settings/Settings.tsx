import React, {ReactNode} from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Card,
  Div,
  SimpleCell,
  Switch,
  FormLayout,
  FormItem,
  Radio
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Spacing from "src/components/Spacing";
import Promocode from "src/components/Promocode/PromocodeContainer";

import {UserInterface} from "src/store/user/reducers";
import {ProfileReducerInterface} from "src/store/profile/reducers";

import platformApi from 'src/js/platformApi';
import appearance from 'src/js/appearance';

import style from "./index.module.scss";

interface IProps extends ProfileReducerInterface {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode | null,
  changeAdditional(data: object),
  changePanel(panel: string, panelData?: any),
  changeSnackbar(snackbar: ReactNode),
  changePopout(popout: ReactNode | null),
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean)
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  customSimpleCell(key: string, name: string, description?: string) {
    const { user, changeAdditional } = this.props;
    const _key = user.data.additional[key];

    return (
      <SimpleCell
        after={
          <Switch
            checked={_key || false}
            onChange={() => changeAdditional({
              [key]: !_key
            })}
          />
        }
        description={description}
        multiline
        disabled
      >
        {name}
      </SimpleCell>
    );
  }

  changeScheme(scheme: 'bright_light' | 'space_gray' | 'auto') {
    const { changeAdditional } = this.props;

    console.log(appearance[scheme].status);
    console.log(appearance[scheme].color);

    if(scheme === 'auto') {
      changeAdditional({
        scheme: scheme
      });
    } else {
      changeAdditional({
        scheme: scheme
      });
      platformApi.changeViewSettings(appearance[scheme].status, appearance[scheme].color);
      console.log('appearance[scheme].status: ' + appearance[scheme].status + ', appearance[scheme].status: ' + appearance[scheme].color)
    }
  }

  render() {
    const {
      id,
      user,
      data,
      snackbar,
      changePanel,
      changeSnackbar,
      changeModal,
      changeAdditional
    } = this.props;
    const { role } = data;
    const {
      easyAnimation,
      showRating,
      snackbarTabNotification,
      vaccineClickNotification,
      accountClosed
    } = user.data.additional;

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
            {this.customSimpleCell(
              'easyAnimation',
              'Упростить анимацию',
              'Наиболее эффективно на слабых устройствах'
            )}
          </Card>
        </Div>
        {/*
        <Div className={style.block}>
          <Header mode="secondary">Тема</Header>
          <Card mode="shadow">
            <FormItem>
                <Radio
                  name="radio"
                  value="3"
                  onClick={() => this.changeScheme('auto')}
                >
                  Автоматически
                </Radio>
                <Radio
                  name="radio"
                  value="1"
                  onClick={() => this.changeScheme('bright_light')}
                >
                  Светлая
                </Radio>
                <Radio
                  name="radio"
                  value="2"
                  onClick={() => this.changeScheme('space_gray')}
                >
                  Темная
                </Radio>
            </FormItem>
          </Card>
        </Div>
        */}
        <Div className={style.block}>
          <Header mode="secondary">Уведомления</Header>
          <Card mode="shadow">
            {this.customSimpleCell(
              'vaccineClickNotification',
              'Получение бонуса при кликах',
              'Если надоело уведомление каждый раз когда заполняется колба'
            )}
            {this.customSimpleCell(
              'snackbarTabNotification',
              'Скрыть уведомления при переходах',
              'Уведомления больше не будут показываться заново'
            )}
          </Card>
        </Div>
        <Div className={style.block}>
          <Header mode="secondary">Аккаунт</Header>
          <Card mode="shadow">
            {this.customSimpleCell(
              'showRating',
              'Отображение в рейтинге',
              'Аккаунт больше не будет показываться в рейтинге'
            )}
            {this.customSimpleCell(
              'accountClosed',
              'Закрытый профиль',
              'Если вы закроете профиль, он будет доступен только вам'
            )}
            {this.customSimpleCell(
              'disableTransfer',
              'Запретить переводы',
              'Если хочешь добиться всего своими руками'
            )}
            {/*<SimpleCell onClick={() => changeModal('dropProgress')}>*/}
            {/*  Сбросить прогресс*/}
            {/*</SimpleCell>*/}
            {/*<SimpleCell*/}
            {/*  onClick={() => changePanel('donate')}*/}
            {/*>*/}
            {/*  Магазин*/}
            {/*</SimpleCell>*/}
            {role === 'admin' && (
              <SimpleCell onClick={() => changePanel('admin')}>
                Будка бомжа
              </SimpleCell>
            )}
          </Card>
          <Spacing size={55} />
        </Div>
        {snackbar}
      </Panel>
    );
  }
}
