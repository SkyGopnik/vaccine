import React from 'react';
import {ModalRoot} from "@vkontakte/vkui";

// Панели
import RatingPanel from 'src/panels/Rating/RatingContainer';
import UserPanel from 'src/panels/User/UserContainer';

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
            component: RatingPanel
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
