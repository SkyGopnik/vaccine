import React from "react";
import {
  Panel,
  PanelHeader,
  Div,
  Title,
  Text,
  Subhead,
  Header,
  Input,
  Button,
  Spacing
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Card from 'src/components/Card/Card';

import Img5 from "src/img/profile/5.svg";
import Img6 from "src/img/profile/6.svg";

import { Icon28Send } from '@vkontakte/icons';

import style from "./Ref.scss";

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
          Спасиние друзей
        </PanelHeader>
        <Div className={style.block}>
          <Text weight="regular">Скопируй код и покажи его другу. За каждое приглашение ты и твой друг получите бонусную вакцину. Спаси своих друзей!</Text>
          <Card>
            <div className={style.ref}>
              <Title level="1" weight="semibold">11928</Title>
              <Subhead weight="regular">Нажми на код, чтобы скопировать его</Subhead>
            </div>
          </Card>
          <Card
            icon={<img src={Img5} alt="" />}
            title="Статистика"
          >
            <Subhead weight="regular">
              <div>· Спасено друзей: </div>
              <div>· Получено вакцины от друзей: </div>
            </Subhead>
          </Card>
        </Div>
        <Div className={style.block}>
          <Header mode="secondary">У меня есть код приглашения</Header>
          <Text weight="regular">Есть код? Ура — ты спасён. Осталось лишь ввести этот код от друга сюда. За это ты получишь подарок.</Text>
          <Card
            icon={<img src={Img6} alt="" />}
            title="Ввести код"
          >
            <Subhead weight="regular">
              <div className={style.input}>
                <Input placeholder="11928" />
                <Button className={style.input}>
                  <Icon28Send />
                </Button>
              </div>
            </Subhead>
          </Card>
          <Spacing size={55} />
        </Div>
      </Panel>
    );
  }
}
