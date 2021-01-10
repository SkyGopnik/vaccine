import React, {ReactElement} from 'react';
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
  FixedLayout
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
  syncUser(data: UserInterface),
  changeModal(modal: string | null, modalData?: Object)
}

interface IState {
  snackbar: ReactElement | null,
  history: Array<{
    name: string
  }>
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      snackbar: null,
      history: []
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('/improvement/');

    // console.log(data);
    // console.log(lo.find(data, { name: `vaccine.Вода` }));
    // console.log(lo.filter(data, (item) => item.name === 'vaccine.Вода').length)

    this.setState({
      history: data
    });
  }

  async buyImprovement(index: number, price: number) {
    const { user } = this.props;

    if (user) {
      if (user.data.balance - price >= 0) {
        const {syncUser} = this.props;

        try {
          const {data} = await axios.post('/improvement/buy', {
            type: 'vaccine',
            index
          });

          this.setState({
            history: data.data.history
          });

          syncUser(data);

          this.changeSnackbar(
            <Snackbar
              layout="vertical"
              onClose={() => this.setState({snackbar: null})}
              before={<Avatar size={24} style={{background: 'var(--accent)'}}><Icon16Done fill="#fff" width={14} height={14}/></Avatar>}
            >
              Вы успешно купили улучшение вакцины, ваш баланс <span style={{color: 'var(--accent)'}}>20 124</span>
            </Snackbar>
          );
        } catch (e) {
          this.changeSnackbar(
            <Snackbar
              layout="vertical"
              onClose={() => this.setState({snackbar: null})}
              before={<Avatar size={24} style={{background: 'var(--destructive)'}}><Icon16Cancel fill="#fff" width={14} height={14}/></Avatar>}
            >
              {e.response.data.message}
            </Snackbar>
          );
        }
      } else if (user.data.click * 5 + user.data.balance - price > 0) {
        // Если доступен просмотр рекламы
        const { changeModal } = this.props;

        changeModal('needMoney', {
          need: price - user.data.balance // Сумма которой не хватает
        });

        console.log('watch ads ' + (price - user.data.balance));
      }
    }
  }

  changeSnackbar(snackbar: ReactElement | null) {
    this.setState({
      snackbar: null
    },  () =>  {
      if (snackbar) {
        this.setState({
          snackbar
        });
      }
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
    const { history } = this.state;

    return lo.filter(history, (historyItem) => historyItem.name === `vaccine.${name}`).length;
  }

  render() {
    const { id, user } = this.props;
    const { snackbar, history } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />}>
          Улучшения
        </PanelHeader>
        <FixedLayout className={style.subHeader} vertical="top">
          <Tabs>
            <TabsItem selected>
              Вакцина
            </TabsItem>
            <TabsItem>
              Учёные
            </TabsItem>
            <TabsItem>
              Аптека
            </TabsItem>
          </Tabs>
        </FixedLayout>
        <Div className={style.list}>
          {improvements['vaccine'].map((item, index) => (
            <Card
              className={style.card}
              key={index}
              size="l"
              mode="shadow"
            >
              <img className={style.icon} src={item.icon} alt=""/>
              <div className={style.content}>
                <div className={style.header}>
                  <Headline weight="medium">{item.name}</Headline>
                  <Caption level="1" weight="regular">{item.count}/клик</Caption>
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
                    disabled={user && ((user.data.click * 5 + user.data.balance) - this.calculatePrice(item.price, this.itemCount(item.name)) < 0)}
                    onClick={() => this.buyImprovement(index, this.calculatePrice(item.price, this.itemCount(item.name)))}
                  >
                    <div>{this.calculatePrice(item.price, this.itemCount(item.name))}</div>
                    <div><MainIcon className={style.btnIcon} /></div>
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
