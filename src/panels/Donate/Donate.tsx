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
  TabsItem, Subhead, Header, Button, Spinner,
  Card
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import CustomCard from 'src/components/Card/Card';
import Spacing from "src/components/Spacing";

import Medal1 from 'src/img/donate/medal1.svg';
import Medal2 from 'src/img/donate/medal2.svg';

import style from "./Donate.scss";
import Img6 from "src/img/profile/6.svg";
import BuyVaccine from "src/components/BuyVaccine/BuyVaccine";
import Vaccine from "src/components/Donate/Vaccine";

interface IProps {
  id: string
}

interface IState {
  type: 'sub' | 'vaccine'
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      type: 'sub'
    };
  }

  render() {
    const { id } = this.props;
    const { type } = this.state;

    return (
      <Panel id={id} className={style.donate}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Магазин
        </PanelHeader>
        <FixedLayout className={style.subHeader} vertical="top">
          <Tabs>
            <TabsItem
              onClick={() => this.setState({ type: 'sub' })}
              selected={type === 'sub'}
            >
              Подписка
            </TabsItem>
            <TabsItem
              onClick={() => this.setState({ type: 'vaccine' })}
              selected={type === 'vaccine'}
            >
              Купить вакцину
            </TabsItem>
          </Tabs>
        </FixedLayout>
        {type === 'sub' && (
          <Div className={style.block}>
            <Text className={style.description} weight="regular">Получите сверхпреимущества игры, оформив подписку. Играть станет интереснее, а разработчики смогут немного покушать ;)</Text>
            <CustomCard noPadding>
              <div className={style.info}>
                <img src={Medal1} alt=""/>
                <div>
                  <Headline weight="medium">Premium за 69₽/мес</Headline>
                  <Text weight="regular">
                    <div>· 10 млн вакцины, 2 маски и 2 респиратора раз в неделю</div>
                    <div>· место в рейтинге донов в игре</div>
                    <div>· набор стикеров ВКонтакте раз в месяц</div>
                  </Text>
                </div>
              </div>
            </CustomCard>
            <CustomCard noPadding>
              <div className={style.info}>
                <img src={Medal2} alt=""/>
                <div>
                  <Headline weight="medium">Premium за 69₽/мес</Headline>
                  <Text weight="regular">
                    <div>· 10 млн вакцины, 2 маски и 2 респиратора раз в неделю</div>
                    <div>· место в рейтинге донов в игре</div>
                    <div>· набор стикеров ВКонтакте раз в месяц</div>
                  </Text>
                </div>
              </div>
            </CustomCard>
            <Caption level="1" weight="regular">Подписка оформляется через VK Donut — сервис ВКонтакте. Её можно отключить в сообществе игры в любой момент. <Link target="_blank" href="https://vk.com/@donut-faq-dlya-donov">Читать подробнее</Link></Caption>
          </Div>
        )}
        {type === 'vaccine' && (
          <>
            <Div className={style.block}>
              <CustomCard
                icon={<img src={Img6} alt="" />}
                title="Покупка вакцины"
              >
                <BuyVaccine />
              </CustomCard>
            </Div>
            <Div className={style.block}>
              <Header mode="secondary">Пакеты вакцины</Header>
              <Vaccine />
            </Div>
          </>
        )}
        <Spacing size={30} />
      </Panel>
    );
  }
}
