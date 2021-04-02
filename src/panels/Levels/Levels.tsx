import React, {ReactNode} from "react";
import {
  Caption,
  Card,
  Div, FixedLayout, Headline,
  Panel,
  PanelHeader, Progress, Tabs, TabsItem,
  Text
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import Img1 from 'src/img/levels/1.svg';

import style from "./Levels.scss";
import {classNames} from "@vkontakte/vkjs";

interface IProps {
  id: string,
  snackbar: ReactNode | null
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { id, snackbar } = this.props;

    return (
      <Panel id={id} className={style.levels}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Уровень
        </PanelHeader>
        <Div>
          <Card
            className={style.card}
            mode="shadow"
          >
            <img src={Img1} alt="" />
            <div className={style.info}>
              <Headline weight="medium">Уровень 3</Headline>
              <div className={style.progressWrapper}>
                <Progress className={style.progress} value={50} />
                <div className={style.numbers}>
                  <Caption level="3" weight="regular">0</Caption>
                  <Caption level="3" weight="regular">100 000</Caption>
                </div>
              </div>
              <Text weight="regular">
                <div>· возможность переводить вакцину другим учёным</div>
                <div>· бонусные 3000 вакцины</div>
                <div>· халявные 20 вакцин за клик</div>
              </Text>
            </div>
          </Card>
          <Card
            className={classNames(style.card, style.cardDisabled)}
            mode="shadow"
          >
            <img src={Img1} alt="" />
            <div className={style.info}>
              <Headline weight="medium">Уровень 2</Headline>
              <div className={style.progressWrapper}>
                <Progress className={style.progress} value={50} />
                <div className={style.numbers}>
                  <Caption level="3" weight="regular">0</Caption>
                  <Caption level="3" weight="regular">100 000</Caption>
                </div>
              </div>
              <Text weight="regular">
                <div>· возможность переводить вакцину другим учёным</div>
                <div>· бонусные 3000 вакцины</div>
                <div>· халявные 20 вакцин за клик</div>
              </Text>
            </div>
          </Card>
          <Card
            className={classNames(style.card, style.cardDisabled)}
            mode="shadow"
          >
            <img src={Img1} alt="" />
            <div className={style.info}>
              <Headline weight="medium">Уровень 1</Headline>
              <div className={style.progressWrapper}>
                <Progress className={style.progress} value={100} />
                <div className={style.numbers}>
                  <Caption level="3" weight="regular">0</Caption>
                  <Caption level="3" weight="regular">100 000</Caption>
                </div>
              </div>
              <Text weight="regular">
                <div>· возможность переводить вакцину другим учёным</div>
                <div>· бонусные 3000 вакцины</div>
                <div>· халявные 20 вакцин за клик</div>
              </Text>
            </div>
          </Card>
        </Div>
        {snackbar}
      </Panel>
    );
  }
}
