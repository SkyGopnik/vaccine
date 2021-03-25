import React, {ReactNode} from "react";
import axios from "axios";
import lo from "lodash";
import Decimal from "decimal.js";
import {
  Input,
  Button,
  Spinner,
  FormItem, Snackbar, Avatar, Text
} from "@vkontakte/vkui";

import {Icon16Cancel, Icon16Done, Icon28Send} from "@vkontakte/icons";

import {locale} from "src/functions/balanceFormat";
import isset from "src/functions/isset";

import {UserInterface} from "src/store/user/reducers";

import style from "./Promocode.scss";

interface IProps {
  user: UserInterface,
  syncUser(data: UserInterface),
  changeSnackbar(snackbar: ReactNode | null),
}

interface IState {
  value: null | string,
  error: string,
  loading: boolean
}

const localization = {
  "Promocode isn't exist": "Промокода не существует",
  "Promocode was activated": "Вы уже активировали этот промокод",
  "Promocode expire": "Срок действия промокода истёк",
  "Promocode limit": "Промокод уже активировало максимальное количество людей"
};

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: '',
      error: undefined,
      loading: false
    };
  }

  handleInputChange(value: string) {
    const sendError = (error: string) => {
      throw error;
    };

    let error = '';

    try {
      if (value.length === 0) {
        sendError(undefined);
      }

      if (value.length >= 30) {
        sendError('Код должен быть меньше 30 символов');
      }

      if (!/^[a-zA-Z0-9_.]{1,30}$/.test(value)) {
        sendError('Неправильный формат');
      }
    } catch (e) {
      error = e;
    }

    this.setState({
      value,
      error
    });
  }

  async activatePromocode() {
    const {
      user,
      syncUser,
      changeSnackbar,
    } = this.props;
    const { value } = this.state;

    this.setState({
      loading: true
    });

    try {
      const { data } = await axios.get(`/promocode/?code=${value}`);

      // Обновляем себе баланс
      syncUser(lo.merge(user, {
        data: {
          balance: new Decimal(user.data.balance).plus(data.bonus)
        }
      }));

      changeSnackbar(
        <Snackbar
          className="success-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        >
          <div>Реферальный код активирован</div>
          <Text weight="medium">Получено {locale(data.bonus)} вакцины</Text>
        </Snackbar>
      );
    } catch (e) {
      console.log(e.response.data.message);
      changeSnackbar(
        <Snackbar
          className="error-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: 'var(--destructive)'}}><Icon16Cancel fill="#fff" width={14} height={14}/></Avatar>}
        >
          {localization[e.response.data.message]}
        </Snackbar>
      );
    }

    this.setState({
      loading: false,
      value: '',
      error: undefined
    });
  }

  render() {
    const {
      value,
      error,
      loading
    } = this.state;

    return (
      <FormItem
        className={style.input}
        status={isset(error) ? (error === '' ? 'valid' : 'error') : 'default'}
        bottom={error ? error : ''}
      >
        <div className={style.code}>
          <Input
            value={value}
            type="text"
            placeholder="freeVaccine"
            disabled={loading}
            onChange={(e) => this.handleInputChange(e.currentTarget.value)}
          />
          <Button
            disabled={loading || (isset(error) ? (error !== '') : true)}
            onClick={() => this.activatePromocode()}
            stretched
          >
            {!loading ? <Icon28Send /> : <Spinner style={{ color: '#fff' }} size="small" />}
          </Button>
        </div>
      </FormItem>
    );
  }
}
