import React, {ReactNode} from 'react';
import axios from "axios";
import {
  Avatar,
  Button,
  FormItem,
  Input,
  ModalCard, Snackbar, Text
} from "@vkontakte/vkui";

import {Icon16Cancel, Icon16Done, Icon28WriteOutline} from "@vkontakte/icons";

import isset from "src/functions/isset";

import style from "./AddPromocode.scss";
import declBySex from "src/functions/declBySex";
import {locale} from "src/functions/balanceFormat";

interface IProps {
  id: string,
  changeSnackbar(snackbar: ReactNode | null)
}

interface FormItem {
  value: string,
  error?: string,
  rules?: {
    required?: boolean,
    max?: number
  }
}

interface IState {
  code: FormItem,
  bonus: FormItem,
  limit: FormItem,
  expireAt: FormItem,
  loading: boolean
}

const inputs = [
  {
    title: 'Название',
    name: 'code',
    type: 'text',
    placeholder: 'FreeVaccine'
  },
  {
    title: 'Бонус',
    name: 'bonus',
    type: 'number',
    placeholder: '0.0005'
  },
  {
    title: 'Лимит',
    name: 'limit',
    type: 'number',
    placeholder: '50'
  },
  {
    title: 'Срок',
    name: 'expireAt',
    type: 'date',
    placeholder: '16.04.2021'
  }
];

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      code: {
        value: '',
        rules: {
          required: true
        }
      },
      bonus: {
        value: '',
        rules: {
          required: true
        }
      },
      limit: {
        value: '',
        rules: {
          required: true
        }
      },
      expireAt: {
        value: '',
        rules: {
          required: true
        }
      },
      loading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    const item: FormItem = this.state[name];

    let error = '';

    if (item.rules) {
      if (value.length === 0 && item.rules.required) {
        error = 'Поле обязательно для заполнения';
      }

      if (value.length >= item.rules.max) {
        error = `Название промокода должно быть меньше ${item.rules.max} символов`;
      }
    }

    this.setState({
      ...this.state,
      [name]: {
        value,
        error
      }
    });
  }

  isFormValid() {
    let isValid = true;

    inputs.forEach((item) => {
      const { value, rules } = this.state[item.name];

      if (value.length == 0 && rules && rules.required) {
        isValid = false;
      }
    });

    return isValid;
  }

  async addPromocode() {
    if (!this.isFormValid()) {
      throw Error('Form isn\'t valid');
    }

    this.setState({
      loading: true
    });

    const { changeSnackbar } = this.props;
    const { code, bonus, limit, expireAt } = this.state;

    try {
      const { data } = await axios.post('/promocode', {
        code: code.value,
        bonus: bonus.value,
        limit: limit.value,
        expireAt: expireAt.value
      });

      changeSnackbar(
        <Snackbar
          className="success-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        >
          <div>Промокод с названием {data.id}, бонусом {data.bonus}, лимитом {data.limit} создан и действует до {data.expireAt}</div>
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

    window.history.back();

    this.setState({
      loading: false
    });
  }

  render() {
    const { loading } = this.state;

    const value = (name: string) => {
      return this.state[name].value;
    };

    const error = (name: string) => {
      return this.state[name].error;
    };

    return (
      <ModalCard
        className={style.modal}
        header="Создание промокода"
        subheader="Для создания собственного промокода, необходимо заполнить все поля"
        actions={
          <Button
            before={!loading && <Icon28WriteOutline width={24} height={24} />}
            size="l"
            disabled={loading || !this.isFormValid()}
            onClick={() => this.addPromocode()}
          >
            Создать
          </Button>
        }
        onClose={() => window.history.back()}
      >
        {inputs.map((item, index) => (
          <FormItem
            key={index}
            status={isset(error(item.name)) ? (error(item.name) === '' ? 'valid' : 'error') : 'default'}
            bottom={error(item.name) ? error(item.name) : ''}
            top={item.title}
          >
            <Input
              name={item.name}
              value={value(item.name)}
              type={item.type}
              placeholder={item.placeholder}
              onChange={this.handleInputChange}
            />
          </FormItem>
        ))}
      </ModalCard>
    );
  }
}
