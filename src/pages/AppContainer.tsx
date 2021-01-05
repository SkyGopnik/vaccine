import React from 'react';
import { connect } from 'react-redux';

import {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  updateHistory
} from '../store/app/actions';
import { syncUser } from '../store/user/actions';
import { connectWs } from "../store/webSocket/actions";
import App from './App';

const AppContainer = (props) => <App {...props} />;

const mapStateToProps = (state) => {
  const props = {
    view: state.app.view,
    panel: state.app.panel,
    modal: state.app.modal,
    story: state.app.story,
    wsLoading: state.webSocket.loading,
    wsError: state.webSocket.error,
    wsData: state.webSocket.data
  };

  return props;
};

const mapDispatchToProps = {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  updateHistory,
  connectWs,
  syncUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
