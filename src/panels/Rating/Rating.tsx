import React from 'react';
import {
  Panel,
  PanelHeader,
  Tabs,
  TabsItem,
  Div,
  Card,
  SimpleCell,
  Avatar,
  IconButton
} from '@vkontakte/vkui';

import {Icon28MoneySendOutline} from "@vkontakte/icons";

import style from './Rating.scss';

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
        <PanelHeader separator={false}>
          Рейтинг
        </PanelHeader>
        <Tabs>
          <TabsItem selected>
            Доктора
          </TabsItem>
          <TabsItem>
            Больницы
          </TabsItem>
        </Tabs>
        <Div>
          <Card
            className={style.card}
            size="l"
            mode="shadow"
          >
            <div className={style.userItem}>
              <div className={style.topNumber}>1.</div>
              <SimpleCell
                target="_blank"
                href={`https://vk.com/skgopnik`}
                before={<Avatar size={48} src="https://sun9-61.userapi.com/O-2f7t0yecmx38WXoF37RkhkJTG2rcjL4Yq88w/J39s0u1f90c.jpg?ava=1" />}
                description="21354562478,31"
                multiline
                disabled
              >
                Антон Иванков
              </SimpleCell>
            </div>
            <div className={style.userItem}>
              <div className={style.topNumber}>2.</div>
              <SimpleCell
                target="_blank"
                href={`https://vk.com/skgopnik`}
                before={<Avatar size={48} src="https://sun9-61.userapi.com/O-2f7t0yecmx38WXoF37RkhkJTG2rcjL4Yq88w/J39s0u1f90c.jpg?ava=1" />}
                after={<IconButton icon={<Icon28MoneySendOutline />} />}
                description="21354562478,31"
                multiline
                disabled
              >
                Антон Иванков
              </SimpleCell>
            </div>
            <div className={style.userItem}>
              <div className={style.topNumber}>3.</div>
              <SimpleCell
                target="_blank"
                href={`https://vk.com/skgopnik`}
                before={<Avatar size={48} src="https://sun9-61.userapi.com/O-2f7t0yecmx38WXoF37RkhkJTG2rcjL4Yq88w/J39s0u1f90c.jpg?ava=1" />}
                after={<IconButton icon={<Icon28MoneySendOutline />} />}
                description="21354562478,31"
                multiline
                disabled
              >
                Антон Иванков
              </SimpleCell>
            </div>
            <div className={style.userItem}>
              <div className={style.topNumber}>4.</div>
              <SimpleCell
                target="_blank"
                href={`https://vk.com/skgopnik`}
                before={<Avatar size={48} src="https://sun9-61.userapi.com/O-2f7t0yecmx38WXoF37RkhkJTG2rcjL4Yq88w/J39s0u1f90c.jpg?ava=1" />}
                after={<IconButton icon={<Icon28MoneySendOutline />} />}
                description="21354562478,31"
                multiline
                disabled
              >
                Антон Иванков
              </SimpleCell>
            </div>
          </Card>
        </Div>
      </Panel>
    );
  }
}
