import React from 'react';

// Панели
import GamePanel from '../../panels/Game/GameContainer';
import ImprovementsPanel from "../../panels/Improvements/Improvements";

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
