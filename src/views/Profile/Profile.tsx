import React from 'react';
import {ModalRoot} from "@vkontakte/vkui";

// Панели
import ProfilePanel from '../../panels/Profile/ProfileContainer';

// Компоненты
import ViewLight from '../../components/ViewLight';

// Модалки
import NewFriend from "src/modals/NewFriend/NewFriendContainer";
import TransferGet from "src/modals/TransferGet/TransferGetContainer";

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
          }
        ]}
      />
    );
  }
}
