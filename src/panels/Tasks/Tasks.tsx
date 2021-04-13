import React, {ReactNode} from 'react';
import lo from 'lodash';
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

import {UserInterface} from "src/store/user/reducers";
import {ProfileData} from "src/store/profile/reducers";

import Img1 from "src/img/tasks/1.svg";
import Img2 from "src/img/tasks/2.svg";
import Img3 from "src/img/tasks/3.svg";
import Img4 from "src/img/tasks/4.svg";
import Img5 from "src/img/tasks/5.svg";

import style from './Tasks.scss';

interface IProps {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode,
  profile: ProfileData,
  syncUser(data: UserInterface),
  changeSnackbar(snackbar: ReactNode | null)
}

interface IState {
  disabledTasks: Array<string>
}

const tasks = [
  {
    name: 'watchAds',
    title: "Посмотреть рекламу",
    desc: "+500 вакцины",
    icon: Img1
  },
  {
    name: 'subscribeGroup',
    title: "Подписаться на нас",
    desc: "+1000 вакцины",
    icon: Img2
  },
  {
    name: 'turnNotifications',
    title: "Включить уведомления",
    desc: "+1000 вакцины",
    icon: Img3
  },
  {
    name: 'shareApp',
    title: "Поделиться приложением",
    desc: "+1000 вакцины",
    icon: Img4
  },
  {
    name: 'refUsers',
    title: "Пригласить друзей",
    desc: "+2000 вакцины за одного друга",
    icon: Img5
  }
];

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      disabledTasks: []
    };
  }

  componentDidMount() {
    const { profile } = this.props;
    const { disabledTasks } = this.state;
    const newTasks = [...disabledTasks];

    if (!profile.ref) {
      newTasks.push('refUsers');
    }

    this.setState({
      disabledTasks: newTasks
    });
  }

  render() {
    const { id } = this.props;
    const { disabledTasks } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Задания
        </PanelHeader>
          <Div className={style.list}>
            {/*Фильтруем от отключенных заданий*/}
            {lo.differenceWith(tasks, disabledTasks, (x, y) => x.name === y).map((item, index) => (
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
                    <Headline weight="medium">{item.title}</Headline>
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
