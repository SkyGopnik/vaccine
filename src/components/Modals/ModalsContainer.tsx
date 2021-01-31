import React from 'react';
import { connect } from 'react-redux';

import Modals from './Modals';

const ModalsContainer = (props) => <Modals {...props} />;

const mapStateToProps = (state) => {
  const props = {
    view: state.app.view,
    panel: state.app.panel,
    modal: state.app.modal,
    story: state.app.story
  };

  return props;
};

export default connect(mapStateToProps)(ModalsContainer);
