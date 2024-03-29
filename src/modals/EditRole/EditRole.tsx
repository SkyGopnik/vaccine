import React, {ReactNode} from 'react';
import axios from "axios";
import {
  Avatar,
  Button,
  FormItem, Input,
  ModalCard, Snackbar
} from "@vkontakte/vkui";
import {Icon16Cancel, Icon16Done, Icon28WriteOutline} from "@vkontakte/icons";

import style from "./EditRole.scss";
import isset from "src/functions/isset";

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
  id: FormItem,
  role: FormItem,
  loading: boolean
}

const inputs = [
  {
    title: 'Цифровой (ые) ID',
    name: 'id',
    type: 'text',
    placeholder: '126399522'
  },
  {
    title: 'Роль',
    name: 'role',
    type: 'text',
    placeholder: 'tester'
  }
];

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      id: {
        value: '',
        rules: {
          required: true
        }
      },
      role: {
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
    }

    this.setState({
      ...this.state,
      [name]: {
        rules: item.rules,
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

  async editRole() {
    if (!this.isFormValid()) {
      throw Error('Form isn\'t valid');
    }

    this.setState({
      loading: true
    });

    const { changeSnackbar } = this.props;
    const { id, role } = this.state;

    try {
      await axios.post('/v1/admin/role', {
        id: id.value.split(','),
        role: role.value
      });

      changeSnackbar(
        <Snackbar
          className="success-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        >
          <div>Роль пользователя с {id.value} был изменён на {role.value}</div>
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
        header="Изменение роли"
        subheader="Для изменения роли, необходимо заполнить все поля"
        actions={
          <Button
            before={!loading && <Icon28WriteOutline width={24} height={24} />}
            size="l"
            disabled={loading || !this.isFormValid()}
            onClick={() => this.editRole()}
          >
            Изменить
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
