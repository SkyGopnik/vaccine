import React, {ReactNode} from "react";
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
import Decimal from "decimal.js";
import {UserInterface} from "src/store/user/reducers";

interface IProps {
  id: string,
  user: UserInterface | null,
  snackbar: ReactNode | null
}

interface IState {
  data: {
    levels: Array<{
      level: number,
      clickUser: number,
      clickPassive: number,
      bonus: number,
      additional?: Array<string>
    }>,
    level: number
  } | null
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('/v1/levels');

    this.setState({
      data
    });
  }

  getLevel(level: number) {
    const lvlStart = (level - 1) !== 0 ? Math.pow(3, level - 1) : 0;
    const lvlEnd = Math.pow(3, level);

    return {
      start: lvlStart,
      end: lvlEnd
    };
  }

  getDifference() {
    const { user } = this.props;
    const { data } = this.state;

    return new Decimal(Math.pow(3, data.level)).minus(new Decimal(user.data.record).toNumber()).toNumber();
  }

  render() {
    const { id, snackbar } = this.props;
    const { data } = this.state;
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
                className={classNames(style.card, item.level < level && style.cardDisabled)}
                key={index}
                mode="shadow"
              >
                <img src={Img1} alt="" />
                <div className={style.info}>
                  <Headline weight="medium">Уровень {item.level}</Headline>
                  <div className={style.progressWrapper}>
                    <Progress className={style.progress} value={100 - 100 / ((this.getLevel(item.level).end - this.getLevel(item.level).start) / this.getDifference())} />
                    <div className={style.numbers}>
                      <Caption level="3" weight="regular">{locale(this.getLevel(item.level).start)}</Caption>
                      <Caption level="3" weight="regular">{locale(this.getLevel(item.level).end)}</Caption>
                    </div>
                  </div>
                  <Text className={style.text} weight="regular">
                    <div>· Улучшение {item.clickUser} за клик</div>
                    <div>· Улучшение {item.clickPassive} в секунду</div>
                    <div>· Бонус {locale(item.bonus)} вакцины</div>
                  </Text>
                  {item.level === level && (
                    <Button
                      className={style.button}
                      mode="outline"
                      size="m"
                    >
                      Получить бонус
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
