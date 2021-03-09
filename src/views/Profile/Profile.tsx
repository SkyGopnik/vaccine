import React from 'react';

// Панели
import ProfilePanel from "src/panels/Profile/ProfileContainer";
import FriendsPanel from "src/panels/Friends/FriendsContainer";
import SettingsPanel from "src/panels/Settings/SettingsContainer";
import NotificationsPanel from "src/panels/Notifications/NotificationsContainer";

// Компоненты
import ViewLight from '../../components/ViewLight';

import {AppReducerInterface} from "src/store/app/reducers";

interface IProps extends AppReducerInterface {
  id: string
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {
      id,
      panel
    } = this.props;

    return (
      <ViewLight
        id={id}
        activePanel={panel}
        panelList={[
          {
            id: 'main',
            component: ProfilePanel
          },
          {
            id: 'friends',
            component: FriendsPanel
          },
          {
            id: 'settings',
            component: SettingsPanel
          },
          {
            id: 'notifications',
            component: NotificationsPanel
          }
        ]}
      />
    );
  }
}
