import React from 'react';
import lo from 'lodash';
import {
  Panel,
  Progress,
  Caption,
  Title, PanelHeader,
  Div, Avatar, Headline, Text, Button, Card
} from '@vkontakte/vkui';

import HistoryBackBtn from "src/components/HistoryBackBtn";

import {UserInterface} from "src/store/user/reducers";

import style from './Profile.scss';
import MainIcon from "src/components/MainIcon";

interface IProps {
  id: string,
  user: UserInterface | null
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {
      id,
      user
    } = this.props;

    const { photo, firstName, lastName } = user.info || {};

    return (
      <Panel id={id}>
        <PanelHeader separator={false}>
          Профиль
        </PanelHeader>
        <Div className={style.avatar}>
          <Avatar src={photo} size={72} />
          <Title level="3" weight="medium">{firstName} {lastName}</Title>
          <Caption level="1" weight="regular">1 274 место в рейтинге</Caption>
        </Div>
        <Div>
          <Card
            className={style.card}
            // key={index}
            size="l"
            mode="shadow"
          >
            1
          </Card>
          <Card
            className={style.card}
            // key={index}
            size="l"
            mode="shadow"
          >
            1
          </Card>
        </Div>
      </Panel>
    );
  }
}
