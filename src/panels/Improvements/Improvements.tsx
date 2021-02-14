import React, {ReactElement, ReactNode} from 'react';
import axios from 'axios';
import lo from 'lodash';
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

import {UserInterface} from "src/store/user/reducers";

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
  history: Array<{
    name: string
  }>,
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
      history: [],
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
      history: data,
      firstLoading: false,
      buttons
    });
  }

  async buyImprovement(index: number, price: number) {
    const { user, changeSnackbar } = this.props;
    const { type } = this.state;

    if (user) {
      console.log(user.data.balance);
      console.log(price);
      console.log(this.getBalanceBribeLimit());

      console.log(this.getBalanceBribeLimit() + user.data.balance - price)

      if (user.data.balance - price >= 0) {
        const { syncUser } = this.props;

        this.setState({
          loading: true
        });

        try {
          this.changeButtonType(index, true);

          const {data} = await axios.post('/improvement/buy', {
            type,
            index
          });

          this.setState({
            history: data.data.history,
            loading: false
          });

          this.changeButtonType(index, false);

          syncUser(data);

          changeSnackbar(
            <Snackbar
              className="success-snack"
              layout="vertical"
              onClose={() => changeSnackbar(null)}
              before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
            >
              <div>Вы успешно купили улучшение.</div>
              <Text weight="medium">Осталось {(user.data.balance - price).toLocaleString()} вакцины</Text>
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
      } else if (this.getBalanceBribeLimit() + user.data.balance - price >= 0) {
        // Если доступен просмотр рекламы
        const { changeModal } = this.props;

        changeModal('needMoney', {
          need: price - user.data.balance // Сумма которой не хватает
        });

        console.log('watch ads ' + (price - user.data.balance));
      }
    }
  }

  changeButtonType(index: number, type: boolean) {
    const { buttons } = this.state;
    const newButtons = [...buttons];

    newButtons[index] = type;

    // console.log(newButtons);

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
    const { history, type } = this.state;

    return lo.filter(history, (historyItem) => historyItem.name === `${type}.${name}`).length;
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
      history,
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
                    disabled={buttons[index] || loading || firstLoading || user && ((this.getBalanceBribeLimit() + user.data.balance - this.calculatePrice(item.price, this.itemCount(item.name))) < 0)}
                    onClick={(e) => this.buyImprovement(index, this.calculatePrice(item.price, this.itemCount(item.name)))}
                  >
                    {!firstLoading && !buttons[index] ? (
                      <>
                        <div>{this.calculatePrice(item.price, this.itemCount(item.name))}</div>
                        <div><MainIcon className={style.btnIcon} /></div>
                      </>
                    ) : <Spinner size="small" />}
                  </Button>
                  {history.length !== 0 && this.itemCount(item.name) !== 0 && (
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
