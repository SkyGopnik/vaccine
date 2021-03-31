import React from 'react';
import { connect } from 'react-redux';

import { sendWsMessage } from "src/store/webSocket/actions";
import { changeSnackbar, changePanel } from "src/store/app/actions";
import { syncUser, changeProgress, balancePlus, changeAdditional } from "src/store/user/actions";
import Game from './Game';

const GameContainer = (props) => <Game {...props} />;

const mapStateToProps = (state) => ({
  user: state.user.data,
  panel: state.app.panel,
  snackbar: state.app.snackbar,
  clickProgress: state.user.clickProgress
});

const mapDispatchToProps = {
  sendWsMessage,
  syncUser,
  changeProgress,
  balancePlus,
  changeSnackbar,
  changePanel,
  changeAdditional
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
