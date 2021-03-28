import React from 'react';
import {ModalRoot} from "@vkontakte/vkui";

// Панели
import RatingPanel from '../../panels/Rating/RatingContainer';

// Модалки
import TransferMoney from "src/modals/TransferMoney/TransferMoneyContainer";

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
      panel,
      modal
    } = this.props;

    return (
      <ViewLight
        id={id}
        activePanel={panel}
        panelList={[
          {
            id: 'main',
            component: RatingPanel
          }
        ]}
      />
    );
  }
}
