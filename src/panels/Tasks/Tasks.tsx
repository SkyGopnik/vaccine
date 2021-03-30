import React, {ReactNode} from 'react';
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

import { tasks } from "src/js/data";


import style from './Tasks.scss';

interface IProps {
  id: string
}

interface IState {
  stat: {
    tasks?: {
      [key: string]: number
    }
  },
  type: 'tasks',
}


export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      stat: {},
      type: 'tasks',
    };
  }

  render() {
    const { id } = this.props;
    const { type } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Задания
        </PanelHeader>
          <Div className={style.list}>
            {tasks[type].map((item, index) => (
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
          </Div>
      </Panel>
    );
  }
}
