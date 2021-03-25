import React from 'react';
import axios from "axios";
import {
  Button,
  FormItem,
  Input,
  ModalCard
} from "@vkontakte/vkui";

import {Icon28WriteOutline} from "@vkontakte/icons";

import isset from "src/functions/isset";

import {UserInterface} from "src/store/user/reducers";

import style from "./CreatedPromocode.scss";

interface IProps {
  id: string,
  user: UserInterface,
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean)
}

interface IState {
  value: null | string,
  valueName: null | string,
  valueQuantity: null | string,
  valueUse: null | string,
  valueDate: null | string,
  errorName: string,
  errorQuantity: string,
  errorUse: string,
  errorDate: string,
  loading: boolean
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      valueName: '',
      valueQuantity: '',
      valueUse: '',
      valueDate: '',
      errorName: undefined,
      errorQuantity: undefined,
      errorUse: undefined,
      errorDate: undefined,
      loading: false
    };
  }

  handleInputChangeName(valueName: string) {
    let errorName = '';

    if (valueName.length === 0) {
      errorName = undefined;
    }

    if (valueName.length >= 50) {
      errorName = 'Название промокода должно быть меньше 50 символов';
    }

    if (!/^\S*$/.test(valueName)) {
      errorName = 'И что ты делаешь?';
    }

    this.setState({
      valueName,
      errorName
    });
  }

  handleInputChangeQuantity(valueQuantity: string) {
    let errorQuantity = '';

    if (valueQuantity.length === 0) {
      errorQuantity = undefined;
    }

    if (valueQuantity.length >= 10) {
      errorQuantity = 'Бонус должен быть меньше 10 символов';
    }

    if (!/^\S*$/.test(valueQuantity)) {
      errorQuantity = 'И что ты делаешь?';
    }

    this.setState({
      valueQuantity,
      errorQuantity
    });
  }

  handleInputChangeUse(valueUse: string) {
    let errorUse = '';

    if (valueUse.length === 0) {
      errorUse = undefined;
    }

    if (valueUse.length >= 10) {
      errorUse = 'Количество использований должно быть меньше 10 символов';
    }

    if (!/^\S*$/.test(valueUse)) {
      errorUse = 'И что ты делаешь?';
    }

    this.setState({
      valueUse,
      errorUse
    });
  }

  handleInputChangeDate(valueDate: string) {
    let errorDate = '';

    if (valueDate.length === 0) {
      errorDate = undefined;
    }
    /*xd, хз как настроить
    поэтому оставил так */
    if (valueDate.length >= 50) {
      errorDate = '??';
    }

    if (!/^\S*$/.test(valueDate)) {
      errorDate = 'И что ты делаешь?';
    }

    this.setState({
      valueDate,
      errorDate
    });
  }

  render() {
    const {
      valueName,
      valueQuantity,
      valueUse,
      valueDate,
      errorName,
      errorQuantity,
      errorUse,
      errorDate,
      loading
    } = this.state;

    return (
      <ModalCard
        className={style.modal}
        header="Создание промокода"
        subheader="Для создания собственного промокода, необходимо заполнить все поля"
        actions={
          <Button
            before={!loading && <Icon28WriteOutline width={24} height={24} />}
            size="l"
            disabled={loading || isset(errorName) || isset(errorQuantity) || isset(errorUse) || isset(errorDate) ? (errorName !== '') || (errorQuantity !== '') || (errorUse !== '') || (errorDate !== '') : true}
          >
            Создать
          </Button>
        }
        onClose={() => window.history.back()}
      >
        <FormItem
          status={isset(errorName) ? (errorName === '' ? 'valid' : 'error') : 'default'}
          bottom={errorName ? errorName : ''}
          top='Название'
        >
          <Input
            value={valueName}
            type="text"
            placeholder="Промокод1"
            onChange={(e) => this.handleInputChangeName(e.currentTarget.value)}
            maxLength = {50}
          />
        </FormItem>
        <FormItem
          status={isset(errorQuantity) ? (errorQuantity === '' ? 'valid' : 'error') : 'default'}
          bottom={errorQuantity ? errorQuantity : ''}
          top='Бонус'
        >
          <Input
            value={valueQuantity}
            type="number"
            placeholder="25"
            onChange={(e) => this.handleInputChangeQuantity(e.currentTarget.value)}
            maxLength = {10}
          />
        </FormItem>
        <FormItem
          status={isset(errorUse) ? (errorUse === '' ? 'valid' : 'error') : 'default'}
          bottom={errorUse ? errorUse : ''}
          top='Количество использований'
        >
          <Input
            value={valueUse}
            type="number"
            placeholder="2"
            maxLength = {10}
            onChange={(e) => this.handleInputChangeUse(e.currentTarget.value)}
          />
        </FormItem>
        <FormItem
          status={isset(errorDate) ? (errorDate === '' ? 'valid' : 'error') : 'default'}
          bottom={errorDate ? errorDate : ''}
          top='Дата окончания'
        >
          <Input
            value={valueDate}
            type="date"
            placeholder="23.02.22"
            onChange={(e) => this.handleInputChangeDate(e.currentTarget.value)}
          />
        </FormItem>
      </ModalCard>
    );
  }
}
