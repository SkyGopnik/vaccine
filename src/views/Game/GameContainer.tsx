import React from 'react';
import { connect } from 'react-redux';

import {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal
} from 'src/store/app/actions';
import { sendWsMessage } from "src/store/webSocket/actions";
import { syncUser } from "src/store/user/actions";
import Game from './Game';

const GameContainer = (props) => <Game {...props} />;

const mapStateToProps = (state) => {
  const props = {
    view: state.app.view,
    panel: state.app.panel,
    modal: state.app.modal,
    user: state.user.data
  };

  return props;
};

const mapDispatchToProps = {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  sendWsMessage,
  syncUser
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
