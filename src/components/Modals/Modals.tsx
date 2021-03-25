import React from 'react';
import {ModalRoot} from "@vkontakte/vkui";

import NeedMoney from "src/modals/NeedMoney/NeedMoneyContainer";
import NewFriend from "src/modals/NewFriend/NewFriendContainer";
import RefMoney from "src/modals/RefMoney/RefMoneyContainer";
import TransferGet from "src/modals/TransferGet/TransferGetContainer";
import TransferMoney from "src/modals/TransferMoney/TransferMoneyContainer";
import TransferUser from "src/modals/TransferUser/TransferUserContainer";
import AddPromocode from "src/modals/AddPromocode/AddPromocodeContainer";

import {AppReducerInterface} from "src/store/app/reducers";

interface IProps extends AppReducerInterface {}

export default (props: IProps) => {
  const { modal } = props;

  return (
    <ModalRoot activeModal={modal} onClose={() => window.history.back()}>
      <NeedMoney id="needMoney" />
      <NewFriend id="newFriend" />
      <RefMoney id="refMoney" />
      <TransferGet id="transferGet" />
      <TransferMoney id="transferMoney" />
      <TransferUser id="transferUser" />
      <AddPromocode id="addPromocode" />
    </ModalRoot>
  );
};
