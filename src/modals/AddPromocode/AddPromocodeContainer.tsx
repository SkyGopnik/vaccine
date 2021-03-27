import React from 'react';
import { connect } from 'react-redux';

import { changeSnackbar } from 'src/store/app/actions';

import  AddPromocode from './AddPromocode';


const AddPromocodeContainer = (props) => <AddPromocode {...props} />;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  changeSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPromocodeContainer);
