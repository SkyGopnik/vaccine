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
import App from './App';

const AppContainer = (props) => <App {...props} />;

const mapStateToProps = (state) => {
  const props = {
    view: state.app.view,
    panel: state.app.panel,
    modal: state.app.modal,
    story: state.app.story
  };

  return props;
};

const mapDispatchToProps = {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  updateHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
