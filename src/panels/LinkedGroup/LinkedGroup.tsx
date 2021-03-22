import React from "react";
import {
  Panel,
  PanelHeader,
  Div,
  Text,
  SimpleCell,
  Avatar,
  CellButton
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Card from 'src/components/Card/Card';

import Img from "src/img/profile/6.svg";

import { Icon28DeleteOutline } from '@vkontakte/icons';

import style from "./LinkedGroup.scss";

interface IProps {
  id: string
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }


  render() {
    const { id } = this.props;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Сообщество
        </PanelHeader>
        <Div className={style.block}>
          <Text weight="regular" style={{ marginBottom: 16 }}>Ты можешь создавать вакцину вместе с учёными выбранного сообщества</Text>
          <Card
            icon={<img src={Img} alt="" />}
            title="Моё сообщество"
          >
            <SimpleCell
              before={<Avatar size={40} />}
              description="182 учёных"
              disabled
            >
              SkyReglis Studio
            </SimpleCell>
          </Card>
          <CellButton before={<Icon28DeleteOutline />} mode="danger">Удалить сообщество</CellButton>
        </Div>
      </Panel>
    );
  }
}
