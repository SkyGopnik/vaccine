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

import { improvements } from "src/js/data";

import { UserInterface } from "src/store/user/reducers";

import { locale } from "src/functions/balanceFormat";

import style from './Improvements.scss';

interface IProps {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode | null,
  changeSnackbar(snackbar: ReactNode | null),
  closeSnackbar(),
  syncUser(data: UserInterface),
  changePopout(popout: ReactNode | null),
  changeModal(modal: string | null, modalData?: Object)
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
  type: 'vaccine' | 'scientists' | 'pharmacy',
  count: number,
  buttons: Array<boolean>,
  loading: boolean,
  firstLoading: boolean
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
      type: 'vaccine',
      count: 1,
      buttons: [],
      loading: false,
      firstLoading: true
    };

    this.actionSheet = React.createRef();
  }

  async componentDidMount() {
    const { type } = this.state;
    const { data } = await axios.get('/improvement/');
    const buttons = [];

    improvements[type].forEach(() => buttons.push(false));

    this.setState({
      stat: data,
      firstLoading: false,
      buttons
    });
  }

  async buyImprovement(index: number, price: number) {
    const { user, changeSnackbar } = this.props;
    const { type, count } = this.state;

    if (user) {
      // console.log(user.data.balance);
      // console.log(price);
      // console.log(this.getBalanceBribeLimit());
      //
      // console.log(this.getBalanceBribeLimit() + user.data.balance - price)

      if (new Decimal(user.data.balance).minus(price).toNumber() >= 0) {
        const { syncUser } = this.props;

        this.setState({
          loading: true
        });

        try {
          this.changeButtonType(index, true);

          const { data } = await axios.post('/improvement/buy', {
            type,
            count,
            index
          });

          this.setState({
            stat: lo.pick(data.stat, ['vaccine', 'scientists']),
            loading: false
          });

          this.changeButtonType(index, false);

          console.log(lo.pick(data.stat, ['vaccine', 'scientists']));

          syncUser(data);

          changeSnackbar(
            <Snackbar
              className="success-snack"
              layout="vertical"
              onClose={() => changeSnackbar(null)}
              before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
            >
              <div>Улучшение куплено</div>
              <Text weight="medium">Осталось {locale(new Decimal(user.data.balance).minus(price).toNumber())} вакцины</Text>
            </Snackbar>
          );
        } catch (e) {
          this.setState({
            loading: false
          });

          this.changeButtonType(index, false);

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
      } else if (new Decimal(user.data.balance).add(this.getBalanceBribeLimit()).minus(price).toNumber() >= 0) {
        // Если доступен просмотр рекламы
        const { changeModal } = this.props;

        console.log(price - new Decimal(user.data.balance).toNumber());

        changeModal('needMoney', {
          need: price - new Decimal(user.data.balance).toNumber() // Сумма которой не хватает
        });

        console.log('watch ads ' + (price - user.data.balance));
      }
    }
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
  calculatePrice(price: number, multiple: number) {
    const { count } = this.state;

    if (multiple !== 0) {
      return price * (multiple + 1) * count;
    }

    return price * count;
  }

  // Подсчёт купленых улучшений
  itemCount(name: string) {
    const { stat, type } = this.state;

    return (stat[type] && stat[type][name]) ? stat[type][name] : 0;
  }

  changeType(name: 'vaccine' | 'scientists' | 'pharmacy') {
    const { type } = this.state;
    const buttons = [];

    improvements[type].forEach(() => buttons.push(false));

    window.scroll({ top: 0, behavior: type === name ? 'smooth' : 'auto' });

    this.setState({
      type: name,
      buttons
    });
  }

  getBalanceBribeLimit() {
    const { user } = this.props;
    const { type, count } = this.state;
    const multiplier = 5;

    return user.data[type === 'vaccine' ? 'click' : 'passive'] * multiplier * count;
  }

  checkAdsWatch(balance: number, price: number, name: string) {

    return (this.getBalanceBribeLimit() + new Decimal(balance).toNumber() - this.calculatePrice(price, this.itemCount(name))) < 0;
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

  render() {
    const { id, user, snackbar, changePopout } = this.props;
    const {
      stat,
      type,
      count,
      buttons,
      loading,
      firstLoading
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
                      onChange={() => this.setState({ count: number })}
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
            {improvements[type].map((item, index) => (
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
                    <Caption level="1" weight="regular">{item.count}/{item.pref}</Caption>
                  </div>
                  <Text
                    className={style.body}
                    weight="regular"
                  >
                    {item.desc}
                  </Text>
                  <div className={style.button}>
                    <Button
                      className={(!this.checkAdsWatch(user.data.balance, item.price, item.name) && new Decimal(user.data.balance).toNumber() < this.calculatePrice(item.price, this.itemCount(item.name))) ? style.watchAds : '123'}
                      mode="outline"
                      size="m"
                      // click * 5 - кол-во которое максимально можно заработать с рекламы 18 * 5 = 90
                      // item.price * lo.filter - стоимость с множителем
                      disabled={buttons[index] || loading || firstLoading || user && this.checkAdsWatch(user.data.balance, item.price, item.name)}
                      onClick={() => this.buyImprovement(index, this.calculatePrice(item.price, this.itemCount(item.name)))}
                    >
                      {!firstLoading && !buttons[index] ? (
                        <>
                          <div>{locale(this.calculatePrice(item.price, this.itemCount(item.name)))}</div>
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
