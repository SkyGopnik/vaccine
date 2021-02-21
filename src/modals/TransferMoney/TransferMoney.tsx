import React, {ReactNode} from 'react';
import axios from 'axios';
import lo from 'lodash';
import Decimal from 'decimal';
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
import declBySex from "src/functions/declBySex";
import balanceFormat from "src/functions/balanceFormat";

import style from './TransferMoney.scss';

interface IProps {
  modalData: {
    backType?: 'double' | 'normal',
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

  handleInputChange(value: string) {
    const { user } = this.props;
    const numValue = Decimal(value).toNumber();

    let error = '';

    if (!/^\d+\.?\d*$/.test(value)) {
      error = 'Неправильный формат';
    }

    if (numValue === 0) {
      error = 'А что переводим?';
    }

    if (numValue > Decimal(user.data.balance).toNumber()) {
      error = 'Недостаточно вакцины';
    }

    if (numValue) {
      const [whole, fractional] = numValue.toString().split('.');

      if (fractional && fractional.length > 4) {
        error = 'Кол-во знаков после запятой должно быть меньше или равно 4';
      }
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

    const {
      firstName,
      lastName,
      photo,
      sex
    } = modalData;
    const toName = `${firstName} ${lastName}`;
    const numValue = Decimal(value).toNumber();

    console.log(numValue);

    // Обнуляем форму и включаем загрузку
    this.setState({
      value: '',
      error: undefined,
      loading: true
    });

    // Передаем деньги
    try {
      await axios.post('/user/transfer/money', {
        type: modalData.backType && modalData.backType === 'double' ? 'user' : 'friend',
        sum: numValue,
        toUserId: modalData.userId
      });
    } catch (e) {
      this.setState({
        loading: false
      });
    }

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
    window.history.go(modalData.backType === 'double' ? -2 : -1);

    // Показываем уведомление
    changeSnackbar(
      <Snackbar
        className={`${this.paddingNeed() ? style.snackbar : ''} success-snack`}
        layout="vertical"
        onClose={() => changeSnackbar(null)}
        before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        after={<Avatar src={photo} size={32} />}
      >
        <div>{toName} {declBySex(sex, ['получил (a)', 'получила', 'получил'])}</div>
        <Text weight="medium">{numValue} вакцины</Text>
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
          <div><span style={{ fontWeight: 500 }}>{toName}</span> получит вакцину, когда я {declBySex(sex, ['его/её', 'её', 'его'])} увижу. В городе полно заражённых и банк закрыт.</div>
          <br/>
          <div>У меня {Decimal(user.data.balance).toNumber() !== 0 ? <span>есть <span style={{ fontWeight: 500 }}>{balanceFormat(user.data.balance)}</span></span> : <span style={{ fontWeight: 500 }}>нет</span>} вакцины</div>
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
            placeholder={balanceFormat(user.data.balance, false)}
            disabled={Decimal(user.data.balance).toNumber() === 0 || loading}
            onChange={(e) => this.handleInputChange(e.currentTarget.value)}
          />
        </FormItem>
      </ModalCard>
    );
  }
}