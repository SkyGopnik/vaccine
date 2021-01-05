import React from 'react';
import { connect } from 'react-redux';

import {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal
} from '../../store/app/actions';
import Rating from './Rating';

const RatingContainer = (props) => <Rating {...props} />;

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
  changeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer);
