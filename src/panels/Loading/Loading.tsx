import React from 'react';
import {
  Panel,
  Spinner,
  Placeholder,
  Button,
  Div
} from '@vkontakte/vkui';

import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";

import { getRandomInt } from "@vkontakte/vkjs";

import style from './Loading.scss';

interface IProps {
  id: string
}

interface IState {
  phrases: Array<string>,
  activePhrase: number
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const phrases = [
      'Проверяем твой код доступа',
      'Пытаемся захватить мир',
      'Пьём кофе, пока ты ждёшь',
      'Проверяем срок годности вакцины',
      'Надеваем маску и перчатки',
      'Пытаемся купить маску без маски',
      'Битва не на жизнь, а за маску',
      'Разбавляем антисептик водой',
      'Нюхаем антисептик после пшика',
      'Перекупаем маски из-за границы',
      'Разливаем антисептик по баночкам',
      'Воюем с охраной за перчатки',
      'Думаем, когда начнётся третья волна',
      'Воруем чужой рецепт вакцины',
      'Меняем полугодовую маску',
      'Делаем вид, что маска новая',
      'Доказываем охраннику, что маска надета правильно',
      'Спорим о важности носить маски',
      'Пытаемся выжить',
      'Опасаемся каждой дверной ручки',
      'А доширак-то ничего за свои деньги',
      'Сдаём тест на коронавайрус',
      'Такими темпами и гречка супер',
      'Закупаем туалетную бумагу',
      'Делаем вид, что учимся на дистанционном обучении',
      'Заклеиваем камеру скотчем'
    ];

    this.state = {
      phrases,
      activePhrase: getRandomInt(0, (phrases.length - 1))
    };
  }

  render() {
    const { id } = this.props;
    const { phrases, activePhrase } = this.state;

    return (
      <Panel id={id}>
        <EmptyBackground />
        <div className={style.middle}>
          <Placeholder
            icon={<Spinner size="large" />}
            header="Загружаемся"
          >
            {phrases[activePhrase]}
          </Placeholder>
        </div>
        <div className={style.bottom}>
          <Div>
            <Button
              size="l"
              stretched
              onClick={() => this.setState({
                activePhrase: getRandomInt(0, (phrases.length - 1))
              })}
            >
              Пожмякать
            </Button>
          </Div>
        </div>
      </Panel>
    );
  }
}
