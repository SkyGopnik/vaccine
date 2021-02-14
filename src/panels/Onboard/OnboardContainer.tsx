import React from 'react';
import { connect } from 'react-redux';

import {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal
} from 'src/store/app/actions';

import { changeAdditional } from "src/store/user/actions";

import Onboard from './Onboard';

const OnboardContainer = (props) => <Onboard {...props} />;

const mapStateToProps = (state) => {
  const props = {
    view: state.app.view,
    panel: state.app.panel,
    modal: state.app.modal
  };

  return props;
};

const mapDispatchToProps = {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeAdditional
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardContainer);
