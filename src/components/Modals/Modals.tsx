import React from 'react';
import {ModalRoot} from "@vkontakte/vkui";

import {
  NeedMoney,
  RefMoney,
  TransferMoney,
  TransferUser,
  AddPromocode,
  EditRole,
  EditUserBan,
  DropProgress
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
      <EditUserBan id="editUserBan" />
      <DropProgress id="dropProgress" />
    </ModalRoot>
  );
};
