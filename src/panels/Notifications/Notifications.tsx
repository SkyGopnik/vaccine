import React from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Card,
  Div,
  Avatar,
  Subhead,
  Text,
  Caption,
  Headline
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";

import style from "./Notifications.scss";

interface IProps {
  id: string
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { id } = this.props;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          События
        </PanelHeader>
        <Div className={style.block}>
          <Header mode="secondary">Новые</Header>
          <Card className={style.card} mode="shadow">
            <Avatar src="https://sun1-90.userapi.com/s/v1/if2/BU2FtExpWyNrPig4yJPmzIaW5Wtd88yW2mb1coyxf1iALDjeYk2R5NbCIFPEkF0I8tRAHZtpK46aRAuF5E4Z8ok1.jpg?size=100x0&quality=96&crop=994,684,747,747&ava=1" size={48} />
            <div className={style.info}>
              <Headline weight="regular">Александр Тихонович</Headline>
              <Text weight="regular">Передал тебе <span style={{ fontWeight: 500 }}>2917,37</span> вакцины</Text>
              <Caption level="2" weight="regular">5 минут назад</Caption>
            </div>
          </Card>
        </Div>
        <Div className={style.block}>
          <Header mode="secondary">Все события</Header>
          <Card className={style.card} mode="shadow">
            <Avatar src="https://sun1-90.userapi.com/s/v1/if2/BU2FtExpWyNrPig4yJPmzIaW5Wtd88yW2mb1coyxf1iALDjeYk2R5NbCIFPEkF0I8tRAHZtpK46aRAuF5E4Z8ok1.jpg?size=100x0&quality=96&crop=994,684,747,747&ava=1" size={48} />
            <div className={style.info}>
              <Headline weight="regular">Александр Тихонович</Headline>
              <Text weight="regular">Передал тебе <span style={{ fontWeight: 500 }}>2917,37</span> вакцины</Text>
              <Caption level="2" weight="regular">5 минут назад</Caption>
            </div>
          </Card>
          <Card className={style.card} mode="shadow">
            <Avatar src="https://sun1-90.userapi.com/s/v1/if2/BU2FtExpWyNrPig4yJPmzIaW5Wtd88yW2mb1coyxf1iALDjeYk2R5NbCIFPEkF0I8tRAHZtpK46aRAuF5E4Z8ok1.jpg?size=100x0&quality=96&crop=994,684,747,747&ava=1" size={48} />
            <div className={style.info}>
              <Headline weight="regular">Александр Тихонович</Headline>
              <Text weight="regular">Передал тебе <span style={{ fontWeight: 500 }}>2917,37</span> вакцины</Text>
              <Caption level="2" weight="regular">5 минут назад</Caption>
            </div>
          </Card>
          <Card className={style.card} mode="shadow">
            <Avatar src="https://sun1-90.userapi.com/s/v1/if2/BU2FtExpWyNrPig4yJPmzIaW5Wtd88yW2mb1coyxf1iALDjeYk2R5NbCIFPEkF0I8tRAHZtpK46aRAuF5E4Z8ok1.jpg?size=100x0&quality=96&crop=994,684,747,747&ava=1" size={48} />
            <div className={style.info}>
              <Headline weight="regular">Александр Тихонович</Headline>
              <Text weight="regular">Передал тебе <span style={{ fontWeight: 500 }}>2917,37</span> вакцины</Text>
              <Caption level="2" weight="regular">5 минут назад</Caption>
            </div>
          </Card>
        </Div>
      </Panel>
    );
  }
}
