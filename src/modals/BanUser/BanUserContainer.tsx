import React from 'react';
import { connect } from 'react-redux';

import { changeSnackbar } from 'src/store/app/actions';

import BanUser from './BanUser';

const BanUserContainer = (props) => <BanUser {...props} />;

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(BanUserContainer);
