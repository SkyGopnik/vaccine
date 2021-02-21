import React, {ReactNode} from 'react';
import axios from 'axios';
import lo from 'lodash';
import Decimal from 'decimal';
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
  Spinner
} from '@vkontakte/vkui';

import {Icon16Cancel, Icon16Done} from "@vkontakte/icons";

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
  buttons: Array<boolean>,
  loading: boolean,
  firstLoading: boolean
}

const localization = {
  "Balance is negative": "Не хватает вакцины"
};

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      stat: {},
      type: 'vaccine',
      buttons: [],
      loading: false,
      firstLoading: true
    };
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
    const { type } = this.state;

    if (user) {
      // console.log(user.data.balance);
      // console.log(price);
      // console.log(this.getBalanceBribeLimit());
      //
      // console.log(this.getBalanceBribeLimit() + user.data.balance - price)

      if (Decimal(user.data.balance).sub(price).toNumber() >= 0) {
        const { syncUser } = this.props;

        this.setState({
          loading: true
        });

        try {
          this.changeButtonType(index, true);

          const { data } = await axios.post('/improvement/buy', {
            type,
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
              <div>Вы успешно купили улучшение.</div>
              <Text weight="medium">Осталось {Decimal(user.data.balance).sub(price).toNumber().toFixed(4)} вакцины</Text>
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
      } else if (Decimal(user.data.balance).add(this.getBalanceBribeLimit()).sub(price).toNumber() >= 0) {
        // Если доступен просмотр рекламы
        const { changeModal } = this.props;

        changeModal('needMoney', {
          need: price - Decimal(user.data.balance).toNumber() // Сумма которой не хватает
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
    if (multiple !== 0) {
      return price * (multiple + 1);
    }

    return price;
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
    const { type } = this.state;
    const multiplier = 5;

    return user.data[type === 'vaccine' ? 'click' : 'passive'] * multiplier;
  }

  render() {
    const { id, user, snackbar } = this.props;
    const {
      stat,
      type,
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
        <Div className={style.list}>
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
                    mode="outline"
                    size="m"
                    // click * 5 - кол-во которое максимально можно заработать с рекламы 18 * 5 = 90
                    // item.price * lo.filter - стоимость с множителем
                    disabled={buttons[index] || loading || firstLoading || user && ((this.getBalanceBribeLimit() + Decimal(user.data.balance).toNumber() - this.calculatePrice(item.price, this.itemCount(item.name))) < 0)}
                    onClick={(e) => this.buyImprovement(index, this.calculatePrice(item.price, this.itemCount(item.name)))}
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
        {snackbar}
      </Panel>
    );
  }
}
