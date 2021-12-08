import React, {ReactNode} from 'react';
import axios from "axios";
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  SimpleCell,
  Avatar,
  Spinner
} from '@vkontakte/vkui';

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Spacing from "src/components/Spacing";

import {UserDataInterface} from "src/store/user/reducers";

import { locale } from "src/functions/balanceFormat";

import style from './AdminRating.scss';

interface IProps {
  id: string,
  snackbar: ReactNode | null,
  changeModal(modal: string | null, modalData?: Object),
  changePanel(panel: string, panelData?: any)
}

interface IState {
  data: Array<UserDataInterface> | null
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('/v1/admin/rating');

    this.setState({
      data
    });
  }


  render() {
    const {
      id,
      changeModal,
      changePanel
    } = this.props;
    const { data } = this.state;

    return (
      <Panel id={id} className={style.rating}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Рейтинг
        </PanelHeader>
        <Div>
          <Card className={style.card} mode="shadow">
            {data ? data.map((item, index) => (
              <div className={style.userItem} key={index}>
                <div className={style.topNumber}>{index + 1}.</div>
                <SimpleCell
                  target="_blank"
                  // href={`https://vk.com/skgopnik`}
                  before={
                    <Avatar
                      size={48}
                      src={item.user.info.photo}
                      onClick={() => changePanel('user', item)}
                    />
                  }
                  description={locale(item.balance)}
                  multiline
                  disabled
                >
                  {item.user.info.firstName} {item.user.info.lastName}
                </SimpleCell>
              </div>
            )) : (
              <Div>
                <Spinner />
              </Div>
            )}
          </Card>
          <Spacing size={140} />
        </Div>
      </Panel>
    );
  }
}
