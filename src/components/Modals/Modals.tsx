import React from 'react';
import {ModalRoot} from "@vkontakte/vkui";

import {
  NeedMoney,
  RefMoney,
  TransferMoney,
  TransferUser,
  AddPromocode,
  EditRole,
  BanUser
} from "src/modals";

import {AppReducerInterface} from "src/store/app/reducers";

interface IProps extends AppReducerInterface {}

export default (props: IProps) => {
  const { modal } = props;

  return (
    <ModalRoot activeModal={modal} onClose={() => window.history.back()}>
      <NeedMoney id="needMoney" />
      <RefMoney id="refMoney" />
      <TransferMoney id="transferMoney" />
      <TransferUser id="transferUser" />
      <AddPromocode id="addPromocode" />
      <EditRole id="editRole" />
      <BanUser id="banUser" />
    </ModalRoot>
  );
};
