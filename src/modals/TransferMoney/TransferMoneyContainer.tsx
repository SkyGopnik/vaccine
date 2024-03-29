import React from 'react';
import { connect } from 'react-redux';

import { changeSnackbar } from 'src/store/app/actions';
import { syncUser } from "src/store/user/actions";
import { sendWsMessage } from "src/store/webSocket/actions";
import { getRating } from "src/store/rating/actions";
import { getNotifications } from "src/store/notifications/actions";

import TransferMoney from './TransferMoney';

const TransferMoneyContainer = (props) => <TransferMoney {...props} />;

const mapStateToProps = (state) => {
  const props = {
    modalData: state.app.modalData,
    user: state.user.data,
    view: state.app.view,
    panel: state.app.panel,
    story: state.app.story
  };

  return props;
};

const mapDispatchToProps = {
  syncUser,
  changeSnackbar,
  sendWsMessage,
  getRating,
  getNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferMoneyContainer);
