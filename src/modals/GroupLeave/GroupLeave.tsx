import React from 'react';
import axios from "axios";
import {
  ModalCard,
  Button, Spinner
} from "@vkontakte/vkui";
import Decimal from "decimal.js";

import {locale} from "src/functions/balanceFormat";
import { leaveGroup } from 'src/functions/getSnackbar';

import {GroupInfoInterface} from "src/store/rating/reducers";
import {UserInterface} from "src/store/user/reducers";
import {AppReducerInterface} from "src/store/app/reducers";
import {ProfileReducerInterface} from "src/store/profile/reducers";
import lo from "lodash";
import {syncUser} from "src/store/user/actions";

import style from "./index.module.scss";

interface IProps extends AppReducerInterface, ProfileReducerInterface {
  id: string,
  user: UserInterface,
  modalData: GroupInfoInterface,
  changeModal(modal: string | null, modalData?: Object, isPopstate?: boolean),
  changePanel(panel: string),
  syncUser(data: UserInterface)
}

interface IState {
  data: GroupInfoInterface,
  loading: boolean
}

export default class extends React.Component<IProps, IState>  {
  private readonly price: number;

  constructor(props) {
    super(props);

    this.state = {
      data: props.modalData,
      loading: false
    };

    this.price = new Decimal(props.user.data.clickUser)
      .mul(500)
      .toNumber();

    this.leaveGroup = this.leaveGroup.bind(this);
    this.close = this.close.bind(this);
  }

  async leaveGroup() {
    const { user, changeSnackbar, getProfile } = this.props;
    const { data } = this.state;

    this.setLoading(true);

    try {
      await axios.post('/v1/group/leave', {
        groupId: data.groupId
      });

      await getProfile(false);

      syncUser(lo.merge(user, {
        data: {
          balance: new Decimal(user.data.balance).minus(this.price)
        }
      }));

      changeSnackbar(leaveGroup(data.name));
    } catch (e) {
      console.log(e);
    }

    this.close();
  }

  setLoading(status) {
    this.setState({
      loading: status
    });
  }

  close() {
    window.history.back();
  }

  render() {
    const { user } = this.props;
    const { data, loading } = this.state;

    const isClose = new Decimal(user.data.balance)
      .minus(this.price)
      .isNegative();

    return (
      <ModalCard
        header="Покинуть лабораторию"
        subheader={<>
          <div className={style.modalDiv}>Ты уверен, что хочешь покинуть <span className="bold">{data.name}</span>?</div>
          <div>Стоимость выхода <span className="bold">{locale(this.price)}</span> вакцины.</div>
          {isClose && <div><span>К сожалению, у вас недостаточно вакцины.</span></div>}
        </>}
        actions={!isClose ? (
          <Button
            mode="destructive"
            size="l"
            disabled={loading}
            onClick={this.leaveGroup}
          >
            {!loading ? "Покинуть" : <Spinner style={{ color: '#fff' }} size="small" />}
          </Button>
        ) : (
          <Button
            mode="destructive"
            size="l"
            onClick={this.close}
            disabled
          >
            Покинуть
          </Button>
        )}
        onClose={() => window.history.back()}
      />
    );
  }

}
