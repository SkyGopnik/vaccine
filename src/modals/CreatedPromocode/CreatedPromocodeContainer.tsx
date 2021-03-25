import React from 'react';
import { connect } from 'react-redux';

import { changeModal } from 'src/store/app/actions';

import CreatedPromocode from './CreatedPromocode';


const CreatedPromocodeContainer = (props) => <CreatedPromocode {...props} />;

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    modalData: state.app.modalData
  };
};

const mapDispatchToProps = {
  changeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatedPromocodeContainer);
