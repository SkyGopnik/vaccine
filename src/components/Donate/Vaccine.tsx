import React from "react";
import {Button, Caption, Card, Headline, Spinner, Text} from "@vkontakte/vkui";

import style from "./Vaccine.scss";
import {locale} from "src/functions/balanceFormat";

interface IProps {}

interface IState {
  buttons: Array<boolean>,
  packs: Array<{
    name: string,
    desc: string,
    count: number,
    price: number,
    icon: string
  }>
}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      buttons: [],
      packs: [
        {
          name: 'Таблетки',
          desc: 'в виде таблеток. Имеют слабое воздействие',
          count: 100,
          price: 10,
          icon: 'https://i.imgur.com/B7JjUAv.png'
        },
        {
          name: 'Баночка',
          desc: 'в виде концентрата, залитого в баночку',
          count: 500,
          price: 30,
          icon: 'https://i.imgur.com/B7JjUAv.png'
        },
        {
          name: 'Чемодан',
          desc: 'в виде концентрата, залитого в баночку',
          count: 1000,
          price: 50,
          icon: 'https://i.imgur.com/B7JjUAv.png'
        },
        {
          name: 'Маленькая фура',
          desc: 'в виде концентрата, залитого в баночку',
          count: 2500,
          price: 100,
          icon: 'https://i.imgur.com/B7JjUAv.png'
        },
        {
          name: 'Фура',
          desc: 'в виде концентрата, залитого в баночку',
          count: 5000,
          price: 150,
          icon: 'https://i.imgur.com/B7JjUAv.png'
        }
      ]
    };
  }

  render() {
    const { buttons, packs } = this.state;

    return (
      packs.map((item, index) => (
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
              {locale(item.count)} ед. вакцины {item.desc}
            </Text>
            <div className={style.button}>
              <Button
                mode="outline"
                size="m"
                disabled={buttons[index]}
                // onClick={(e) => this.buyImprovement(index, this.calculatePrice(item.price, this.itemCount(item.name)))}
              >
                {!buttons[index] ? `${item.price} ₽` : <Spinner size="small" />}
              </Button>
            </div>
          </div>
        </Card>
      ))
    )
  }
}
