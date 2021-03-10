import React from "react";
import {
  Panel,
  PanelHeader,
  Div,
  Text,
  Link,
  Headline,
  Caption,
  FixedLayout,
  Tabs,
  TabsItem
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import Card from 'src/components/Card/Card';

import style from "./Donate.scss";

interface IProps {
  id: string
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  select(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setState({ mode, contextOpened: false });
  }

  render() {
    const { id } = this.props;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Магазин
        </PanelHeader>
        <FixedLayout className={style.subHeader} vertical="top">
          <Tabs>
            <TabsItem
              onClick={() => this.changeType('sub')}
              selected={type === 'sub'}
            >
              Подписка
            </TabsItem>
            <TabsItem
              onClick={() => this.changeType('buy')}
              selected={type === 'buy'}
            >
              Купить вакцину
            </TabsItem>
          </Tabs>
        </FixedLayout>
        <Div className={style.block}>
          <Text weight="regular" style={{ marginBottom: 16 }}>Получите сверхпреимущества игры, оформив подписку. Играть станет интереснее, а разработчики смогут немного покушать ;)</Text>
          <Card>
            <Headline weight="medium" className={style.headline}>Premium за 69₽/мес</Headline>
            <Text weight="regular" className={style.dark}>
              <div>· 10 млн вакцины, 2 маски и 2 респиратора раз в неделю</div>
              <div>· место в рейтинге донов в игре</div>
              <div>· набор стикеров ВКонтакте раз в месяц</div>
            </Text>
          </Card>
          <Card>
            <Headline weight="medium" className={style.headline}>Premium за 99₽/мес</Headline>
            <Text weight="regular" className={style.dark}>
              <div>· 10 млн вакцины, 2 маски и 2 респиратора раз в неделю</div>
              <div>· место в рейтинге донов в игре</div>
              <div>· набор стикеров ВКонтакте раз в месяц</div>
              <div>· чай, кофе, шаверма с доставкой</div>
            </Text>
          </Card>
          <Caption level="1" weight="regular">Подписка оформляется через VK Donut — сервис ВКонтакте. Её можно отключить в сообществе игры в любой момент. <Link>Читать подробнее</Link></Caption>
        </Div>
      </Panel>
    );
  }
}
