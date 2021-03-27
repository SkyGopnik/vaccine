import React from 'react';
import axios from "axios";
import {
  Button,
  FormItem,
  Input,
  ModalCard,
  Separator,
  Title,
  RichCell,
  Avatar, Caption
} from "@vkontakte/vkui";
import { Icon28MoneySendOutline, Icon24ChevronLeft, Icon24MoreHorizontal } from "@vkontakte/icons";

import Card from "src/components/Card/Card";

import isset from "src/functions/isset";

import {UserInterface} from "src/store/user/reducers";

import style from "./TransferUser.scss";
import {getRandomInt} from "@vkontakte/vkjs";

interface IProps {
  id: string,
  user: UserInterface,
  changeModal(modal: null | string, modalData?: any, isPopstate?: boolean)
}

interface IState {
  value: string,
  error: string,
  loading: boolean,
  randomTeam: Team
}

interface Team {
  name: string,
  status: string,
  img: string
}

const team: Array<Team> = [
  {
    name: 'Артём Петрунин',
    status: '</>',
    img: 'https://sun1-91.userapi.com/s/v1/ig2/7B5zlAVlxq8fzmyyY4PvFzhOzqufJlewKEoGCKFW1Snvllcx3vmfoERGUgBog_Ed4aE5k-pGxe0gAhn4JhXhb5gP.jpg?size=100x0&quality=96&crop=0,267,1296,1296&ava=1'
  },
  {
    name: 'Александр Тихонович',
    status: 'Продам гараж',
    img: 'https://sun1-90.userapi.com/s/v1/if2/BU2FtExpWyNrPig4yJPmzIaW5Wtd88yW2mb1coyxf1iALDjeYk2R5NbCIFPEkF0I8tRAHZtpK46aRAuF5E4Z8ok1.jpg?size=100x0&quality=96&crop=994,684,747,747&ava=1'
  },
  {
    name: 'Антон Иванков',
    status: 'Продам гараж',
    img: 'https://sun1-90.userapi.com/s/v1/if1/Ef_yRkoR42rVnJs5VbrSzOM-ARTrQSR7Tze7GDPvYja0IjV5_HGfR-vHJhecCndUxPxZgb7R.jpg?size=100x0&quality=96&crop=0,0,2160,2160&ava=1'
  },
  {
    name: 'Аня Безуглова',
    status: 'Ламповый художник',
    img: 'https://sun1-85.userapi.com/s/v1/ig2/76WlLgkHgCQuDkSNx8hLlUa3oME01eDLSMPoP8965EfMtPMxJh5XjaTjHmv82cXlc0RxIc0ogQMe-o-VnHniwlQt.jpg?size=100x0&quality=96&crop=22,74,519,519&ava=1'
  },
];

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: undefined,
      loading: false,
      randomTeam: team[getRandomInt(0, (team.length - 1))]
    };
  }

  handleInputChange(value: string) {
    let error = '';

    if (value.length === 0) {
      error = undefined;
    }

    if (value.length >= 50) {
      error = 'ID или короткий адрес должен быть меньше 50 символов';
    }

    if (!/^\S*$/.test(value)) {
      error = 'И что ты делаешь?';
    }

    this.setState({
      value,
      error
    });
  }

  async getUser() {
    const { user, changeModal } = this.props;
    let { value } = this.state;

    // Проверяем на присутствие ссылки
    const matchUrl = value.match(/\/\w+/gm);

    if (matchUrl && matchUrl[matchUrl.length - 1]) {
      value = matchUrl[matchUrl.length - 1].replace('/', '');
    }

    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      value,
      error,
      loading,
      randomTeam
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
        <Card className={style.copy} noPadding>
          <div className={style.header}>
            <Icon24ChevronLeft />
            <Title level="2" weight="heavy">skgopnik</Title>
            <Icon24MoreHorizontal />
          </div>
          <div className={style.mini}>
            <div className={style.arrow} />
            <Caption className={style.copyItem} level="1" weight="regular">Скопировать</Caption>
            <Caption className={style.shareItem} level="1" weight="regular">Поделиться</Caption>
          </div>
          <Separator />
          <RichCell
            disabled
            multiline
            before={<Avatar size={64} src={randomTeam.img} />}
            text={randomTeam.status}
            caption="offline"
          >
            {randomTeam.name}
          </RichCell>
        </Card>
        <FormItem
          status={isset(error) ? (error === '' ? 'valid' : 'error') : 'default'}
          bottom={error ? error : null}
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
