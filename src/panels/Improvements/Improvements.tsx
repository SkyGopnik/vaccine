import React, {ReactNode} from 'react';
import axios from 'axios';
import lo from 'lodash';
import Decimal from 'decimal.js';
import {
  Panel,
  PanelHeader,
  Tabs,
  TabsItem,
  Div,
  Card,
  Headline,
  Caption,
  Text,
  Button,
  Snackbar,
  Avatar,
  FixedLayout,
  Spinner, Counter, ActionSheet, ActionSheetItem
} from '@vkontakte/vkui';

import {Icon16Cancel, Icon16Done} from "@vkontakte/icons";
import { Swipeable } from 'react-swipeable';

import HistoryBackBtn from "src/components/HistoryBackBtn";
import MainIcon from "src/components/MainIcon";

import { UserInterface } from "src/store/user/reducers";

import { locale } from "src/functions/balanceFormat";

import style from './Improvements.scss';
import bridge from "@vkontakte/vk-bridge";

interface IProps {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode | null,
  changeSnackbar(snackbar: ReactNode | null),
  closeSnackbar(),
  syncUser(data: UserInterface),
  changePopout(popout: ReactNode | null),
  changeModal(modal: string | null, modalData?: Object),
  changeAdditional(data: object)
}

interface ImprovementItem {
  name: string,
  desc: string,
  price: number,
  count: number,
  icon: string,
  pref: string
}

interface IState {
  stat: {
    vaccine?: {
      [key: string]: number
    },
    scientists?: {
      [key: string]: number
    }
  },
  improvements: {
    vaccine: Array<ImprovementItem>,
    scientists: Array<ImprovementItem>
  } | null,
  type: 'vaccine' | 'scientists' | 'pharmacy',
  count: number,
  buttons: Array<boolean>,
  loading: boolean
}

const localization = {
  "Balance is negative": "Не хватает вакцины"
};

export default class extends React.Component<IProps, IState> {
  private actionSheet: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);

    this.state = {
      stat: {},
      improvements: null,
      type: 'vaccine',
      count: 1,
      buttons: [],
      loading: true
    };

    this.actionSheet = React.createRef();
  }

  async componentDidMount() {
    const { user } = this.props;
    const { type } = this.state;

    const count = user.data.additional.improvementsCount ? user.data.additional.improvementsCount : 1;

    const { data } = await axios.get('/v1/improvement');
    const { stat, improvements } = data;

    const buttons = Array(improvements[type].length).fill(false);

    console.log(data);

    this.setState({
      stat,
      improvements,
      buttons,
      count,
      loading: false
    });
  }

  async buyImprovement(index: number, item) {
    const { user, syncUser, changeSnackbar } = this.props;
    const { type, count } = this.state;

    if (!user) {
      return;
    }

    this.setState({
      loading: true
    });

    try {
      this.changeButtonType(index, true);

      const { data } = await axios.post('/v1/improvement/buy', {
        type,
        count,
        index
      });

      const price = this.calculatePrice(item);
      const balance = new Decimal(user.data.balance)
        .minus(price)
        .toNumber();

      syncUser(data);

      this.setState({
        stat: lo.pick(data.stat, ['vaccine', 'scientists'])
      });

      changeSnackbar(
        <Snackbar
          className="success-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        >
          <div>Улучшение куплено</div>
          <Text weight="medium">Осталось {locale(balance)} вакцины</Text>
        </Snackbar>
      );
    } catch (e) {
      changeSnackbar(
        <Snackbar
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: 'var(--destructive)'}}><Icon16Cancel fill="#fff" width={14} height={14}/></Avatar>}
        >
          {localization[e.response.data.message] ? localization[e.response.data.message] : e.response.data.message}
        </Snackbar>
      );
    }

    this.changeButtonType(index, false);

    this.setState({
      loading: false
    });
  }

  // Изменение типа кнопки
  changeButtonType(index: number, type: boolean) {
    const { buttons } = this.state;
    const newButtons = [...buttons];

    newButtons[index] = type;

    this.setState({
      buttons: newButtons
    });
  }

  // Подсчёт стоимости улучшения
  calculatePrice(item) {
    const userCount = this.state.count;

    const price = item.price;
    const count = new Decimal(this.itemCount(item.name))
      .plus(userCount)
      .toNumber();

    return Number(
      new Decimal(price)
        .mul(
          new Decimal(1.04)
            .pow(count)
            .toNumber()
        )
        .toFixed(4)
    );
  }

  // Подсчёт купленых улучшений
  itemCount(name: string) {
    const { stat, type } = this.state;

    return (stat[type] && stat[type][name]) ? stat[type][name] : 0;
  }

  changeType(name: 'vaccine' | 'scientists' | 'pharmacy') {
    const { type, improvements } = this.state;

    const buttons = Array(improvements[type].length).fill(false);

    window.scroll({ top: 0, behavior: type === name ? 'smooth' : 'auto' });

    this.setState({
      type: name,
      buttons
    });
  }

  multipleCount(number: number, multiple: number) {
    return new Decimal(number).mul(multiple).toNumber();
  }

  swipe(motion: 'left' | 'right') {
    const { type } = this.state;

    const types: Array<'vaccine' | 'scientists' | 'pharmacy'> = ['vaccine', 'scientists'];

    try {
      window.scroll({ top: 0, behavior: 'auto' });
    } catch (e) {
      console.log(e);
    }

    if (motion === 'left') {
      this.setState({
        type: types[types.indexOf(type) + 1] ? types[types.indexOf(type) + 1] : types[0]
      });
    } else if (motion === 'right') {
      this.setState({
        type: types[types.indexOf(type) - 1] ? types[types.indexOf(type) - 1] : types[types.length - 1]
      });
    }
  }

  changeCount(count: number) {
    const { changeAdditional } = this.props;

    changeAdditional({
      improvementsCount: count
    });

    this.setState({ count });
  }

  buttonDisabled(index, item) {
    const { user } = this.props;
    const { buttons, loading } = this.state;

    if (buttons[index]) {
      return true;
    }

    if (loading) {
      return true;
    }

    return this.calculatePrice(item) >= new Decimal(user.data.balance).toNumber();
  }

  render() {
    const { id, snackbar, changePopout } = this.props;
    const {
      stat,
      improvements,
      type,
      count,
      buttons
    } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Улучшения
        </PanelHeader>
        <FixedLayout className={style.subHeader} vertical="top">
          <Tabs>
            <TabsItem
              onClick={() => this.changeType('vaccine')}
              selected={type === 'vaccine'}
            >
              Вакцина
            </TabsItem>
            <TabsItem
              onClick={() => this.changeType('scientists')}
              selected={type === 'scientists'}
            >
              Учёные
            </TabsItem>
            {/*<TabsItem*/}
            {/*  onClick={() => this.setState({ type: 'pharmacy' })}*/}
            {/*  selected={type === 'pharmacy'}*/}
            {/*>*/}
            {/*  Аптека*/}
            {/*</TabsItem>*/}
          </Tabs>
        </FixedLayout>
        <Swipeable
          onSwipedLeft={() => this.swipe('left')}
          onSwipedRight={() => this.swipe('right')}
        >
          <Div className={style.list}>
            <Button
              className={style.count}
              size="m"
              after={<Counter size="s">x{count}</Counter>}
              onClick={() => changePopout(
                <ActionSheet
                  iosCloseItem={<ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
                  toggleRef={this.actionSheet.current}
                  onClose={() => changePopout(null)}
                >
                  {[1, 5, 10].map((number) => (
                    <ActionSheetItem
                      key={number}
                      checked={count === number}
                      autoclose
                      selectable
                      onChange={() => this.changeCount(number)}
                    >
                      x{number}
                    </ActionSheetItem>
                  ))}
                </ActionSheet>
              )}
              stretched
            >
              Количество
            </Button>
            {improvements && improvements[type].map((item, index) => (
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
                    <Caption level="1" weight="regular">{this.multipleCount(item.count, count)}/{item.pref}</Caption>
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
                      disabled={this.buttonDisabled(index, item)}
                      onClick={() => this.buyImprovement(index, item)}
                    >
                      {!buttons[index] ? (
                        <>
                          <div>{locale(this.calculatePrice(item))}</div>
                          <div><MainIcon className={style.btnIcon} /></div>
                        </>
                      ) : <Spinner size="small" />}
                    </Button>
                    {stat[type] && this.itemCount(item.name) !== 0 && (
                      <Caption className={style.buyInfo} level="1" weight="regular">{this.itemCount(item.name)} куплено</Caption>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </Div>
        </Swipeable>
        {snackbar}
      </Panel>
    );
  }
}
