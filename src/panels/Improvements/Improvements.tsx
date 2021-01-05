import React from 'react';
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
  Button
} from '@vkontakte/vkui';

import HistoryBackBtn from "src/components/HistoryBackBtn";

import Dispenser from 'src/img/vaccine/Dispenser.png';

import style from './Improvements.scss';
import MainIcon from "src/components/MainIcon";

interface IProps {
  id: string
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { id } = this.props;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Улучшения
        </PanelHeader>
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
        <Div>
          <Card
            className={style.card}
            size="l"
            mode="shadow"
          >
            <img src={Dispenser} alt=""/>
            <div className={style.content}>
              <div className={style.header}>
                <Headline weight="medium">Антисептик</Headline>
                <Caption level="1" weight="regular">0,05/клик</Caption>
              </div>
              <Text
                className={style.body}
                weight="regular"
              >
                Позволяет убивать 99,7% вирусов и бактерий. Но сильно сушит кожу
              </Text>
              <div className={style.button}>
                <Button mode="outline" size="m">
                  <div>1,25</div>
                  <div><MainIcon className={style.btnIcon} /></div>
                </Button>
                <Caption className={style.buyInfo} level="1" weight="regular">17 куплено</Caption>
              </div>
            </div>
          </Card>
          <Card
            className={style.card}
            size="l"
            mode="shadow"
          >
            <img src={Dispenser} alt=""/>
            <div className={style.content}>
              <div className={style.header}>
                <Headline weight="medium">Антисептик</Headline>
                <Caption level="1" weight="regular">0,05/клик</Caption>
              </div>
              <Text
                className={style.body}
                weight="regular"
              >
                Позволяет убивать 99,7% вирусов и бактерий. Но сильно сушит кожу
              </Text>
              <div className={style.button}>
                <Button mode="outline" size="m">
                  <div>1,25</div>
                  <div><MainIcon className={style.btnIcon} /></div>
                </Button>
                <Caption className={style.buyInfo} level="1" weight="regular">17 куплено</Caption>
              </div>
            </div>
          </Card>
          <Card
            className={style.card}
            size="l"
            mode="shadow"
          >
            <img src={Dispenser} alt=""/>
            <div className={style.content}>
              <div className={style.header}>
                <Headline weight="medium">Антисептик</Headline>
                <Caption level="1" weight="regular">0,05/клик</Caption>
              </div>
              <Text
                className={style.body}
                weight="regular"
              >
                Позволяет убивать 99,7% вирусов и бактерий. Но сильно сушит кожу
              </Text>
              <div className={style.button}>
                <Button mode="outline" size="m">
                  <div>1,25</div>
                  <div><MainIcon className={style.btnIcon} /></div>
                </Button>
                <Caption className={style.buyInfo} level="1" weight="regular">17 куплено</Caption>
              </div>
            </div>
          </Card>
        </Div>
      </Panel>
    );
  }
}
