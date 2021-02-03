import React from 'react';
import {
  ModalCard,
  Button,
  Text,
  Caption,
  Div,
  Headline
} from "@vkontakte/vkui";

import {UserDataInterface, UserInterface} from "src/store/user/reducers";

import Money from "src/img/Money.png";

import style from './RefMoney.scss';

interface IProps {
  id: string,
  modalData: {
    data: UserDataInterface,
    sum: number
  },
  user: UserInterface
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  declBySex(sex: 0 | 1 | 2, array: Array<string>) {
    return array[sex];
  }

  render() {
    const { modalData, user } = this.props;

    const { firstName, lastName, sex } = modalData.data.user.info || {};

    return (
      <ModalCard
        className={style.modal}
        header={`Подарок от ${this.declBySex(sex, ['доктора', 'подруги', 'друга'])}!`}
        actions={
          <Button size="l" onClick={() => {
            console.log('click');
            window.history.back();
          }}>
            Начать игру
          </Button>
        }
        onClose={() => window.history.back()}
      >
        <Div className={style.avatar}>
          <Caption level="1" weight="regular"><span style={{ fontWeight: 500 }}>{firstName} {lastName}</span> {this.declBySex(sex, ['пригласил (а)', 'пригласила', 'пригласил'])} тебя в игру</Caption>
        </Div>
        <Div className={style.info}>
          <img src={Money} alt="" />
          <div className={style.content}>
            <Headline weight="medium">Ты {this.declBySex(user.info.sex, ['получил (a)', 'получила', 'получил'])} {modalData.sum} вакцины</Headline>
            <Text weight="regular">{this.declBySex(sex, ['Доктор', 'Подруга', 'Друг'])}, который меня позвал, решил мне помочь, я обязательно его отблагодарю, но позже</Text>
          </div>
        </Div>
      </ModalCard>
    );
  }
}
