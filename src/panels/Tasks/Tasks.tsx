import React from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  Headline,
  Text,
  Button,
} from '@vkontakte/vkui';

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Spacing from "src/components/Spacing";

import style from './Tasks.scss';
import Img1 from "src/img/tasks/1.svg";
import Img2 from "src/img/tasks/2.svg";
import Img3 from "src/img/tasks/3.svg";
import Img4 from "src/img/tasks/4.svg";
import Img5 from "src/img/tasks/5.svg";

interface IProps {
  id: string
}

const tasks = [
  {
    name: "Посмотреть рекламу",
    desc: "+500 вакцины",
    icon: Img1,
  },
  {
    name: "Подписаться на нас",
    desc: "+1000 вакцины",
    icon: Img2,
  },
  {
    name: "Включить уведомления",
    desc: "+1000 вакцины",
    icon: Img3,
  },
  {
    name: "Поделиться приложением",
    desc: "+1000 вакцины",
    icon: Img4,
  },
  {
    name: "Пригласить друзей",
    desc: "+2000 вакцины за одного друга",
    icon: Img5,
  }
];

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
          Задания
        </PanelHeader>
          <Div className={style.list}>
            {tasks.map((item, index) => (
              <Card
                className={style.card}
                key={index}
                mode="shadow"
              >
                <div className={style.icon}>
                  <img src={item.icon} alt=""/>
                </div>
                <div className={style.content}>
                  <div className={style.header}>
                    <Headline weight="medium">{item.name}</Headline>
                  </div>
                  <Text
                    className={style.body}
                    weight="regular"
                  >
                    {item.desc}
                  </Text>
                  <div className={style.button}>
                    <Button
                      mode="outline"
                      size="m"
                    >
                      Выполнить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            <Spacing size={70} />
          </Div>
      </Panel>
    );
  }
}
