import React from 'react';
import { connect } from 'react-redux';

import { changeModal, changePanel, changeStory } from "src/store/app/actions";

import AdminRating from './AdminRating';

const AdminRatingContainer = (props) => <AdminRating {...props} />;

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  changeModal,
  changePanel
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRatingContainer);
