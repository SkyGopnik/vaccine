import React from 'react';
import {
  Panel,
  PanelHeader,
  Tabs,
  TabsItem,
  Div,
  Card
} from '@vkontakte/vkui';

import HistoryBackBtn from "src/components/HistoryBackBtn";

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
          <Card size="l" mode="shadow">
            <div style={{ height: 96 }} />
          </Card>
        </Div>
      </Panel>
    );
  }
}
