import React from 'react';
import axios from "axios";
import {
  Button,
  FormItem,
  Input,
  ModalCard
} from "@vkontakte/vkui";

import {Icon28MoneySendOutline} from "@vkontakte/icons";

import isset from "src/functions/isset";

import style from "./TransferUser.scss";
import {UserInterface} from "src/store/user/reducers";

interface IProps {
  id: string,
  user: UserInterface,
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean)
}

interface IState {
  value: null | string,
  error: string,
  loading: boolean
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: undefined,
      loading: false
    };
  }

  handleInputChange(value: string) {
    let error = '';

    if (value.length === 0) {
      error = 'А кому переводим?';
    }

    this.setState({
      value,
      error
    });
  }

  async getUser() {
    const { user, changeModal } = this.props;
    const { value } = this.state;
    const { data } = await axios.get(`/user/id?userId=${value}`);

    if (data) {
      if (user.id !== String(data.id)) {
        changeModal('transferMoney', {
          backType: 'double',
          userId: String(data.id),
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.photo_100,
          sex: data.sex
        });
      } else {
        this.setState({
          error: 'Что я делаю?'
        });
      }
    } else {
      this.setState({
        error: 'Пользователь не присоединился к игре'
      });
    }
  }

  render() {
    const { id } = this.props;
    const {
      value,
      error,
      loading
    } = this.state;

    return (
      <ModalCard
        className={style.modal}
        header="Передача вакцины"
        subheader="Чтобы скопировать ID, зажмите адрес пользователя"
        actions={
          <Button
            before={!loading && <Icon28MoneySendOutline width={24} height={24} />}
            size="l"
            disabled={loading || isset(error) ? (error !== '') : true}
            onClick={() => this.getUser()}
          >
            Передать
          </Button>
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
            placeholder="ID или короткий адрес"
            onChange={(e) => this.handleInputChange(e.currentTarget.value)}
          />
        </FormItem>
      </ModalCard>
    );
  }
}
