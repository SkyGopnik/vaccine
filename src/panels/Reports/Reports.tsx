import React, {ReactNode} from 'react';
import axios from "axios";
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  SimpleCell,
  Avatar,
  Spinner, Header, RichCell, Button
} from '@vkontakte/vkui';

import HistoryBackBtn from "src/components/HistoryBackBtn";

import {UserInterface} from "src/store/user/reducers";

import style from './Reports.scss';
import Spacing from "src/components/Spacing";

interface IProps {
  id: string,
  snackbar: ReactNode | null,
  changeModal(modal: string | null, modalData?: Object),
  changePanel(panel: string, panelData?: any)
}

interface IState {
  data: Array<UserInterface> | null
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    await this.getReports();
  }

  async changeReport(id: string, type: 'reject' | 'accept') {
    await axios.post('/admin/report/change', { id, type });
    await this.getReports();
  }

  async getReports() {
    const { data } = await axios.get('/admin/report');

    this.setState({
      data
    });
  }

  render() {
    const {
      id,
      changePanel
    } = this.props;
    const { data } = this.state;

    return (
      <Panel id={id} className={style.rating}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Репорты
        </PanelHeader>
        {data ? (
          Object.keys(data).map((key, index) => (
            <Div className={style.block} key={index}>
              <Header mode="secondary">ID: {key}</Header>
                <Card className={style.card} mode="shadow">
                  {data[key].map((logItem, logIndex) => (
                    <div className={style.userItem} key={logIndex}>
                      <RichCell
                        target="_blank"
                        before={
                          <Avatar
                            size={48}
                            src={logItem.user.info.photo}
                            onClick={() => changePanel('user', logItem.user)}
                          />
                        }
                        text={logItem.text}
                        caption={logItem.type}
                        multiline
                        disabled
                      >
                        {logItem.user.info.firstName} {logItem.user.info.lastName}
                      </RichCell>
                    </div>
                  ))}
                  <div className={style.button}>
                    <Button mode="destructive" onClick={() => this.changeReport(key,'reject')}>Отклонить</Button>
                    <Button mode="commerce" onClick={() => this.changeReport(key,'accept')}>Принять</Button>
                  </div>
                </Card>
            </Div>
          ))
        ) : (
          <Div>
            <Spinner />
          </Div>
        )}
        <Spacing size={140} />
      </Panel>
    );
  }
}
