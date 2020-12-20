import React from 'react';

// Панели
import GamePanel from '../panels/Game/Game';
import ImprovementsPanel from "src/panels/Improvements";

// Компоненты
import ViewLight from '../components/ViewLight';

import {AppReducerIterface} from "src/store/app/reducers";

interface IProps extends AppReducerIterface {
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
            component: GamePanel
          },
          {
            id: 'improvements',
            component: ImprovementsPanel
          }
        ]}
      />
    );
  }
}
