import React from 'react';

// Панели
import ProfilePanel from "src/panels/Profile/ProfileContainer";
import FriendsPanel from "src/panels/Friends/FriendsContainer";
import SettingsPanel from "src/panels/Settings/SettingsContainer";
import NotificationsPanel from "src/panels/Notifications/NotificationsContainer";
import RefPanel from "src/panels/Ref/RefContainer";
import AdminPanel from "src/panels/Admin/AdminContainer";
import LinkedGroupPanel from "src/panels/LinkedGroup/LinkedGroup";
import DonatePanel from "src/panels/Donate/Donate";
import TasksPanel from "src/panels/Tasks/TasksContainer";

// Компоненты
import ViewLight from '../../components/ViewLight';

import {AppReducerInterface} from "src/store/app/reducers";
import UserPanel from "src/panels/User/UserContainer";

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
          },
          {
            id: 'ref',
            component: RefPanel
          },
          {
            id: 'admin',
            component: AdminPanel
          },
          {
            id: 'linkedGroup',
            component: LinkedGroupPanel
          },
          {
            id: 'donate',
            component: DonatePanel
          },
          {
            id: 'tasks',
            component: TasksPanel
          },
          {
            id: 'user',
            component: UserPanel
          }
        ]}
      />
    );
  }
}
