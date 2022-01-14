import React, { ReactNode } from "react";
import Decimal from "decimal.js";
import {
  Card,
  CardGrid,
  Group,
  Panel,
  PanelHeader,
  Text,
  Link
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import { classNames } from "@vkontakte/vkjs";

import style from "./index.module.scss";

import { UserInterface } from "src/store/user/reducers";
import { AppReducerInterface } from "src/store/app/reducers";

interface IProps extends AppReducerInterface {
  id: string
}

interface IState {
  questions: Array<{
    title: string, description: string | ReactNode
  }>
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      questions: [
        {
          title: "Что за игра «Вакцина»?",
          "description": "Вакцина — это игра, в которой тебе предстоит сражаться с вирусом, выполнять задания и занять верхушку топа! Игра со своей валютой, которую можно получать за клики."
        },
        {
          title: "Куда вводить промокод?",
          "description": "Кейс первый: промокод можно ввести зайдя в профиль → настройки (левый верхний угол) → раздел «Промокод». Кейс второй: игра → задания (левый верхний угол) → раздел «Промокод»."
        },
        {
          title: "Что дает спасение друга?",
          "description": "За каждое приглашение ты и твой друг получите бонусную вакцину в зависимости от вашего развития в игре."
        },
        {
          title: "Можно ли продавать или покупать валюту?",
          "description": "К сожалению, на данный момент это запрещено правилами ВК, но мы пытаемся уладить этот момент."
        },
        {
          title: "Разрешено ли использование закрытого API приложения?",
          "description": "Использование закрытого API запрещено."
        },
        {
          title: "Я заметил нарушение, что мне делать?",
          "description": "Вы можете сообщить нам в личные сообщения об этом. Но помните, запрещено писать необоснованные жалобы на других игроков."
        },
        {
          title: "Какие правила еще следует соблюдать, чтобы не получить блокировку?",
          "description": "Запрещено мошенничество в игре и за её пределами. Запрещено представлять себя как Разработчик/Администратор/Модератор нашего проекта, не являясь таковым. Запрещено использование багов. Лучше напишите нам в личку. Людям, группам, сервисам находящихся в топе запрещено размещать на аватарках или в названии рекламу, шок контент, порно, контент не соответствующим правилам ВК или РФ, и ином случае будет запрет на показ в топе."
        },
        {
          title: "Что будет за нарушение правил?",
          "description": "За нарушение правил вам выдается статус нарушителя, либо перманентная блокировка на усмотрение администрации."
        },
        {
          title: "У меня остался вопрос, что мне делать?",
          "description": (<> Если остались вопросы, их можно задать нам в лс сообщества: <Link
            href="https://vk.me/skyreglis" target="_blank"> vk.me/skyreglis </Link> </>)
        }
      ]
    };
  }

  render() {
    const { id, snackbar } = this.props;
    const { questions } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          FAQ
                </PanelHeader>
        <Group>
          {questions.map((item, index) =>
            <CardGrid size="l">
              <Card mode="shadow" className={style.card}>
                <Text weight="semibold">
                  {item.title}
                </Text>
                <Text weight="regular" className={style.text}>
                  {item.description}
                </Text>
              </Card>
            </CardGrid>
          )}
        </Group>
      </Panel>
    );
  }
}
