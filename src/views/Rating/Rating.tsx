import React from 'react';

// Панели
import RatingPanel from '../../panels/Rating/RatingContainer';

// Модалки
import TransferMoney from "src/modals/TransferMoney/TransferMoneyContainer";

// Компоненты
import ViewLight from '../../components/ViewLight';

import {AppReducerInterface} from "src/store/app/reducers";
import {ModalRoot} from "@vkontakte/vkui";

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
        modal={
          <ModalRoot activeModal={modal} onClose={() => window.history.back()}>
            <TransferMoney id="transferMoney" />
          </ModalRoot>
        }
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
