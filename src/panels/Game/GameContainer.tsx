import React from 'react';
import { connect } from 'react-redux';

import { sendWsMessage } from "src/store/webSocket/actions";
import { syncUser } from "src/store/user/actions";
import Game from './Game';

const GameContainer = (props) => <Game {...props} />;

const mapStateToProps = (state) => {
  const props = {
    user: state.user.data
  };

  return props;
};

const mapDispatchToProps = {
  sendWsMessage,
  syncUser
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
