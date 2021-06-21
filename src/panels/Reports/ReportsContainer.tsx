import React from 'react';
import { connect } from 'react-redux';

import { changeModal, changePanel, changeStory } from "src/store/app/actions";

import Reports from './Reports';

const ReportsContainer = (props) => <Reports {...props} />;

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  changeModal,
  changePanel
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer);
