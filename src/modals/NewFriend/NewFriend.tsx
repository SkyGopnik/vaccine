import React from 'react';
import {
  ModalCard,
  Button,
  Avatar,
  Text,
  Caption,
  Div,
  Headline
} from "@vkontakte/vkui";

import {UserInterface} from "src/store/user/reducers";

import Money from "src/img/Money.png";

import style from './NewFriend.scss';

interface IProps {
  id: string,
  modalData: {
    data: UserInterface,
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

    const { firstName, lastName, sex, photo } = modalData.data.info || {};

    return (
      <ModalCard
        className={style.modal}
        header="Новый друг в игре"
        actions={
          <Button size="l" onClick={() => window.history.back()}>
            Играть дальше
          </Button>
        }
        onClose={() => window.history.back()}
      >
        <Div className={style.avatar}>
          <Avatar src={photo} size={72} />
          <Caption level="1" weight="regular"><span style={{ fontWeight: 500 }}>{firstName} {lastName}</span> {this.declBySex(sex, ['присоединился (ась)', 'присоединилась', 'присоединился'])} по твоему приглашению</Caption>
        </Div>
        <Div className={style.info}>
          <img src={Money} alt="" />
          <div className={style.content}>
            <Headline weight="medium">Ты {this.declBySex(user.info.sex, ['получил (a)', 'получила', 'получил'])} {modalData.sum} вакцины</Headline>
            <Text weight="regular">Приглашай друзей, чтобы ускориться и быстрее достигнуть цели!</Text>
          </div>
        </Div>
      </ModalCard>
    );
  }
}
