import React from 'react';
import { connect } from 'react-redux';

import { sendWsMessage } from "src/store/webSocket/actions";
import { changeSnackbar } from "src/store/app/actions";
import { syncUser, changeProgress, balancePlus } from "src/store/user/actions";
import Game from './Game';

const GameContainer = (props) => <Game {...props} />;

const mapStateToProps = (state) => {
  const props = {
    user: state.user.data,
    panel: state.app.panel,
    snackbar: state.app.snackbar,
    clickProgress: state.user.clickProgress
  };

  return props;
};

const mapDispatchToProps = {
  sendWsMessage,
  syncUser,
  changeProgress,
  balancePlus,
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
