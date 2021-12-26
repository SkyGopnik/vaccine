import React, {ReactNode} from "react";
import Decimal from "decimal.js";
import {
  Button,
  Caption,
  Card,
  Div,
  Headline,
  Panel,
  PanelHeader,
  Progress,
  Spinner,
  Text
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Spacing from "src/components/Spacing";

import Img1 from 'src/img/levels/1.svg';

import {classNames} from "@vkontakte/vkjs";

import style from "./index.module.scss";
import axios from "axios";
import {locale} from "src/functions/balanceFormat";

import {UserInterface} from "src/store/user/reducers";
import {AppReducerInterface} from "src/store/app/reducers";
import {changeSnackbar} from "src/store/app/actions";
import {levelBonus} from "src/functions/getSnackbar";
import lo from "lodash";

interface IProps extends AppReducerInterface {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode | null,
  syncUser(data: UserInterface)
}

interface IState {
  data: {
    levels: Array<{
      level: number,
      clickUser: number,
      clickPassive: number,
      bonus: number,
      isBonus?: boolean,
      additional?: Array<string>
    }>,
    level: number
  } | null,
  buttons: Array<boolean>
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: null,
      buttons: []
    };
  }

  async componentDidMount() {
    await this.loadLevels();
  }

  async loadLevels() {
    const { data } = await axios.get('/v1/levels');

    this.setState({
      data,
      buttons: new Array(data.length).fill(false)
    });
  }

  getLevel(level: number) {
    const _level = level - 1;

    const lvlStart = (_level - 1) !== 0 ? Math.pow(3, _level - 1) : 0;
    const lvlEnd = Math.pow(3, _level);

    return {
      start: lvlStart,
      end: lvlEnd
    };
  }

  getDifference() {
    const { user } = this.props;
    const { data } = this.state;

    return new Decimal(Math.pow(3, data.level - 1))
      .minus(new Decimal(user.data.record).toNumber())
      .toNumber();
  }

  getLevelProgress(level: number) {
    const _level = level - 1;
    const progress = 100 - 100 / ((this.getLevel(_level).end - this.getLevel(_level).start) / this.getDifference());

    return progress > 0 ? progress : 100;
  }

  async completeLevel(index: number, level: number) {
    const { user, syncUser, changeSnackbar } = this.props;

    this.changeButtonType(index, true);

    try {
      const { data } = await axios.post('/v1/levels', {
        level
      });

      await this.loadLevels();

      syncUser(lo.merge(user, {
        data: {
          balance: new Decimal(user.data.balance).plus(data.bonus),
          clickUser: new Decimal(user.data.clickUser).plus(data.clickUser),
          clickPassive: new Decimal(user.data.clickPassive).plus(data.clickPassive)
        }
      }));

      changeSnackbar(levelBonus(level));
    } catch (e) {
      console.log(e);
    }

    this.changeButtonType(index, false);
  }

  changeButtonType(index: number, type: boolean) {
    const { buttons } = this.state;
    const newButtons = [...buttons];

    newButtons[index] = type;

    this.setState({
      buttons: newButtons
    });
  }

  render() {
    const { id, snackbar } = this.props;
    const { data, buttons } = this.state;

    const level = data && data.level;

    return (
      <Panel id={id} className={style.levels}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Уровень
        </PanelHeader>
        {data ? (
          <Div>
            {data.levels.map((item, index) => item.level <= level && (
              <Card
                className={classNames(style.card, !item.isBonus && style.cardDisabled)}
                key={index}
                mode="shadow"
              >
                <img src={Img1} alt="" />
                <div className={style.info}>
                  <Headline weight="medium">Уровень {item.level}</Headline>
                  {item.level !== 1 && (
                    <div className={style.progressWrapper}>
                      <Progress className={style.progress} value={this.getLevelProgress(item.level)} />
                      <div className={style.numbers}>
                        <Caption level="3" weight="regular">{locale(this.getLevel(item.level).start)}</Caption>
                        <Caption level="3" weight="regular">{locale(this.getLevel(item.level).end)}</Caption>
                      </div>
                    </div>
                  )}
                  <Text className={style.text} weight="regular">
                    <div>· Бонус <span style={{ fontWeight: 500 }}>{locale(item.bonus)}</span> вакцины</div>
                    <div>· Улучшение <span style={{ fontWeight: 500 }}>{item.clickPassive}</span> в секунду</div>
                    <div>· Улучшение <span style={{ fontWeight: 500 }}>{item.clickUser}</span> за клик</div>
                  </Text>
                  {item.isBonus && (
                    <Button
                      className={style.button}
                      mode="outline"
                      size="m"
                      disabled={buttons[index]}
                      onClick={() => this.completeLevel(index, item.level)}
                    >
                      {!buttons[index] ? "Получить бонус" : <Spinner size="small" />}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
            <Spacing size={55} />
          </Div>
        ) : <Spinner />}
        {snackbar}
      </Panel>
    );
  }
}
