import React, {ReactNode} from 'react';
import lo from 'lodash';
import axios from "axios";
import Decimal from "decimal.js";
import bridge, {AnyRequestMethodName} from "@vkontakte/vk-bridge";
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  Headline,
  Text,
  Button, Spinner, Snackbar, Avatar, PullToRefresh
} from '@vkontakte/vkui';
import {Icon16Cancel, Icon16Done} from "@vkontakte/icons";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Spacing from "src/components/Spacing";

import {UserInterface} from "src/store/user/reducers";
import {ProfileData} from "src/store/profile/reducers";

import declBySex from "src/functions/declBySex";
import {locale} from "src/functions/balanceFormat";

import Img1 from "src/img/tasks/1.svg";
import Img2 from "src/img/tasks/2.svg";
import Img3 from "src/img/tasks/3.svg";
import Img4 from "src/img/tasks/4.svg";
import Img5 from "src/img/tasks/5.svg";
import Img6 from "src/img/tasks/6.svg";
import Img7 from "src/img/tasks/7.svg";

import {config} from "src/js/config";

import style from './Tasks.scss';
import Promocode from "src/components/Promocode/PromocodeContainer";
import task from "src/errors/task";

interface Task {
  multiplier: number,
  name: string,
  img: ReactNode,
  type?: string,
  history: Array<any>,
  isRepeatable: boolean
}

interface IProps {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode,
  profile: ProfileData,
  syncUser(data: UserInterface),
  changeSnackbar(snackbar: ReactNode | null)
}

interface IState {
  ptr: boolean,
  disabledTasks: Array<string>,
  tasks: null | Array<Task>
}

const tasksConfig: {
  [key: string]: {
    img: string,
    vk: string
  }
} = {
  watchAds: {
    img: Img1,
    vk: 'VKWebAppShowNativeAds'
  },
  subGroup: {
    img: Img2,
    vk: 'VKWebAppJoinGroup'
  },
  enableNotifications: {
    img: Img3,
    vk: 'VKWebAppAllowNotifications'
  },
  addToFavorites: {
    img: Img6,
    vk: 'VKWebAppAddToFavorites'
  },
  addToHomeScreen: {
    img: Img7,
    vk: 'VKWebAppAddToHomeScreen'
  },
};

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ptr: false,
      disabledTasks: [],
      tasks: null
    };
  }

  async componentDidMount() {
    const { profile } = this.props;
    const { disabledTasks } = this.state;
    const newDisabledTasks = [...disabledTasks];

    newDisabledTasks.push('shareStory');

    if (!profile.ref) {
      newDisabledTasks.push('refUsers');
    }

    await this.getTasks();

    this.setState({
      disabledTasks: newDisabledTasks,
    });
  }

  async getTasks() {
    const { data } = await axios.get('/task');

    this.setState({
      tasks: data
    });
  }

  async completeTask(type: string) {
    const { user, syncUser, changeSnackbar } = this.props;

    new Promise(function(resolve, reject) {
      switch (type) {
        case 'watchAds':
          bridge.send("VKWebAppShowNativeAds" as any, {ad_format: 'reward'})
            .then((res) => resolve(res))
            .catch((err) => reject(err));
          break;

        case 'subGroup':
          bridge.send("VKWebAppJoinGroup", {"group_id": 191809582})
            .then((res) => resolve(res))
            .catch((err) => reject(err));
          break;

        case 'enableNotifications':
          bridge.send("VKWebAppAllowNotifications")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
          break;

        case 'addToFavorites':
          bridge.send("VKWebAppAddToFavorites")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
          break;

        case 'addToHomeScreen':
          if (bridge.supports("VKWebAppAddToHomeScreen")) {
            bridge.send("VKWebAppAddToHomeScreen")
              .then((res) => resolve(res))
              .catch((err) => reject(err));
          } else {
            reject()
          }
          break;
      }
    }).then(async () => {
      const { data } = await axios.post('/task/complete', {
        type
      });

      await this.getTasks();

      syncUser(lo.merge(user, {
        data: {
          balance: new Decimal(user.data.balance).plus(data.bonus)
        }
      }))

      changeSnackbar(
        <Snackbar
          className="success-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        >
          <div>Ты {declBySex(user.info.sex, ['получил (a)', 'получила', 'получил'])}</div>
          <Text weight="medium">{locale(data.bonus)} вакцины</Text>
        </Snackbar>
      );
    }).catch((err) => {
      let error = "Произошла ошибка во время выполнения задания";

      if (err) {
        error = task[type][err.error_data.error_code];
      }

      changeSnackbar(
        <Snackbar
          className="error-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: 'var(--destructive)'}}><Icon16Cancel fill="#fff" width={14} height={14}/></Avatar>}
        >
          {error}
        </Snackbar>
      );
    });
  }

  taskDisabled(item) {
    if (item.history.length === 0) {
      return;
    }

    const now = new Date().getTime() / 1000;
    const repeat = new Date(item.history[0].repeatAfter).getTime() / 1000;

    return item.history[0].repeatAfter !== null ? (now < repeat) : true;
  }

  taskButton(item) {
    const disabled = this.taskDisabled(item);
    const onClick = () => this.completeTask(item.type);

    return (
      <Button
        mode="outline"
        size="m"
        disabled={disabled}
        onClick={onClick}
      >
        {!disabled ? 'Выполнить' : 'Выполнено'}
      </Button>
    );
  }

  async onRefresh() {
    this.setState({ ptr: true });

    setTimeout(async () => {
      await this.getTasks();

      this.setState({ ptr: false })
    }, 1000);
  }

  render() {
    const { id, snackbar, user } = this.props;
    const { ptr, tasks, disabledTasks } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Задания
        </PanelHeader>
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
          <Div className={style.list}>
            <Card mode="shadow">
              <Promocode />
            </Card>
            <Spacing size={12} />
            {tasks ? (
              lo.differenceWith(tasks, disabledTasks, (x, y) => x.type === y).map((item, index) => (
                bridge.supports(tasksConfig[item.type].vk as AnyRequestMethodName) && (
                  <Card
                    className={style.card}
                    key={index}
                    mode="shadow"
                  >
                    <div className={style.icon}>
                      <img src={tasksConfig[item.type].img} alt="" />
                    </div>
                    <div className={style.content}>
                      <div className={style.header}>
                        <Headline weight="medium">{item.name}</Headline>
                      </div>
                      <Text
                        className={style.body}
                        weight="regular"
                      >
                        {locale(new Decimal((user.data.clickUser ? user.data.clickUser : 1) * item.multiplier).toNumber())} вакцины
                      </Text>
                      <div className={style.button}>
                        {this.taskButton(item)}
                      </div>
                    </div>
                  </Card>
                )
              ))
            ) : <Spinner />}
            <Spacing size={70} />
          </Div>
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
