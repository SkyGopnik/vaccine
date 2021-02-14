import React, {ReactNode} from 'react';
import axios from 'axios';
import lo from 'lodash';
import {
  ModalCard,
  Button,
  Input,
  FormItem,
  Spinner, Avatar, Text, Snackbar
} from "@vkontakte/vkui";

import {Icon16Done, Icon28MoneySendOutline} from "@vkontakte/icons";

import {UserInterface} from "src/store/user/reducers";

import isset from "src/functions/isset";
import declNum from "src/functions/decl_num";

import style from './TransferMoney.scss';

interface IProps {
  modalData: {
    type?: 'user' | 'friend',
    userId: string,
    firstName: string,
    lastName: string,
    photo: string,
    sex: 0 | 1 | 2
  },
  user: UserInterface,
  view: string,
  panel: string,
  story: string,
  syncUser(data: UserInterface),
  getRating(needLoading?: boolean),
  changeSnackbar(snackbar: ReactNode | null),
  sendWsMessage(data: object)
}

interface IState {
  value: null | string,
  error: string,
  loading: boolean,
  btnType: 'transfer' | 'close'
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: '',
      error: undefined,
      loading: false,
      btnType: 'transfer'
    }
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      btnType: user.data.balance !== 0 ? 'transfer' : 'close'
    });
  }

  declBySex(sex: 0 | 1 | 2, array: Array<string>) {
    return array[sex];
  }

  handleInputChange(value: string) {
    const { user } = this.props;

    let error;

    if (value.length !== 0) {
      if (/^\d+\,?\d*$/.test(value)) {
        const numValue = Number(value.replace(',', '.'));

        if (numValue !== 0) {
          if (numValue <= user.data.balance) {
            error = '';
          } else {
            error = 'Недостаточно вакцины';
          }
        } else {
          error = 'Серьёзно, ноль?';
        }
      } else {
        error = 'Неправильный формат';
      }
    } else {
      error = 'А что переводим?';
    }

    this.setState({
      value,
      error
    });
  }

  paddingNeed() {
    const { panel, story } = this.props;

    return story === 'rating' && panel === 'main';
  }

  async transferMoney() {
    const { panel, story } = this.props;
    const { value } = this.state;
    const {
      user,
      modalData,
      syncUser,
      changeSnackbar,
      getRating,
      sendWsMessage
    } = this.props;

    const { firstName, lastName, photo } = modalData;
    const toName = `${firstName} ${lastName}`;
    const numValue = +Number(value.replace(',', '.')).toFixed(2);

    // Обнуляем форму и включаем загрузку
    this.setState({
      value: '',
      error: undefined,
      loading: true
    });

    // Передаем деньги
    await axios.post('/user/transfer/money', {
      sum: numValue,
      toUserId: modalData.userId
    });

    if (story === 'rating' && panel === 'main') {
      // Обновляем рейтинг
      await getRating(false);
    }

    // Уменьшаем баланс пользователю
    syncUser(lo.merge(user, {
      data: {
        balance: user.data.balance - numValue
      }
    }));

    // Синхронизируем другого пользователя если он в игре
    sendWsMessage({
      type: 'TransferMoney',
      toUserId: modalData.userId,
      sum: numValue
    });

    // Закрываем модалку
    window.history.go(modalData.type === 'user' ? -2 : -1);

    // Показываем уведомление
    changeSnackbar(
      <Snackbar
        className={`${this.paddingNeed() ? style.snackbar : ''} success-snack`}
        layout="vertical"
        onClose={() => changeSnackbar(null)}
        before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        after={<Avatar src={photo} size={32} />}
      >
        <div>{toName} получил</div>
        <Text weight="medium">{numValue.toLocaleString()} {declNum(numValue.toLocaleString(), ['вакцину', 'вакцины', 'вакцины'])}</Text>
      </Snackbar>
    );
  }

  render() {
    const { modalData, user } = this.props;
    const {
      value,
      error,
      loading,
      btnType
    } = this.state;

    const { firstName, lastName, sex } = modalData;
    const toName = `${firstName} ${lastName}`;

    return (
      <ModalCard
        className={style.modal}
        header="Передача вакцины"
        subheader={<>
          <div><span style={{ fontWeight: 500 }}>{toName}</span> получит вакцину, когда я {this.declBySex(sex, ['его/её', 'её', 'его'])} увижу. В городе полно заражённых и банк закрыт.</div>
          <br/>
          <div>У меня {user.data.balance !== 0 ? <span>есть <span style={{ fontWeight: 500 }}>{user.data.balance.toLocaleString()}</span></span> : <span style={{ fontWeight: 500 }}>нет</span>} вакцины</div>
        </>}
        actions={
          btnType === 'transfer' ? (
            <Button
              before={!loading && <Icon28MoneySendOutline width={24} height={24} />}
              size="l"
              disabled={loading || isset(error) ? (error !== '') : true}
              onClick={() => this.transferMoney()}
            >
              {!loading ? 'Передать' : <Spinner style={{ color: '#fff' }} size="small" />}
            </Button>
          ) : (
            <Button size="l" onClick={() => window.history.back()}>
              Закрыть
            </Button>
          )
        }
        onClose={() => window.history.back()}
      >
        <FormItem
          status={isset(error) ? (error === '' ? 'valid' : 'error') : 'default'}
          bottom={error ? error : ''}
        >
          <Input
            value={value}
            type="text"
            placeholder={user.data.balance.toFixed(2).replace('.', ',')}
            disabled={user.data.balance === 0 || loading}
            onChange={(e) => this.handleInputChange(e.currentTarget.value)}
          />
        </FormItem>
      </ModalCard>
    );
  }
}
