import React from 'react';
import { connect } from 'react-redux';

import {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  updateHistory
} from 'src/store/app/actions';
import TabbarLight from './TabbarLight';

const TabbarLightContainer = (props) => <TabbarLight {...props} />;

const mapStateToProps = (state) => ({
  view: state.app.view,
  panel: state.app.panel,
  modal: state.app.modal,
  story: state.app.story,
  user: state.user.data,
  ratingUser: state.rating.list.user,
  ratingLoading: state.rating.list.loading,
  profile: state.profile.data,
  randomUser: state.randomUser
});

const mapDispatchToProps = {
  changeView,
  changePanel,
  changeViewPanelStory,
  changeModal,
  changeStory,
  updateHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(TabbarLightContainer);
