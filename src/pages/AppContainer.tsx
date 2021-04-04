import React from 'react';
import { connect } from 'react-redux';

import {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  changePopout,
  updateHistory
} from '../store/app/actions';
import { syncUser } from '../store/user/actions';
import { connectWs, sendWsMessage } from "../store/webSocket/actions";
import App from './App';

const AppContainer = (props) => <App {...props} />;

const mapStateToProps = (state) => ({
  wsLoading: state.webSocket.loading,
  wsError: state.webSocket.error,
  wsData: state.webSocket.data,
  ...state.app
});

const mapDispatchToProps = {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  changePopout,
  updateHistory,
  connectWs,
  sendWsMessage,
  syncUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
