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
  IconButton,
  Spinner
} from '@vkontakte/vkui';

import {Icon28MoneySendOutline} from "@vkontakte/icons";

import {RatingReducerIterface} from "src/store/rating/reducers";

import balanceFormat from "src/functions/balanceFormat";

import style from './Rating.scss';

interface IProps extends RatingReducerIterface {
  id: string
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const { getRating } = this.props;

    getRating();
  }

  render() {
    const { id, list } = this.props;

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
            {!list.loading ? list.data.map((item, index) => (
              <div className={style.userItem} key={index}>
                <div className={style.topNumber}>{index + 1}.</div>
                <SimpleCell
                  target="_blank"
                  href={`https://vk.com/skgopnik`}
                  before={<Avatar size={48} src={item.user.info.photo} />}
                  after={(item.userId !== list.user.userId) && <IconButton icon={<Icon28MoneySendOutline />} />}
                  description={balanceFormat(item.balance)}
                  multiline
                  disabled
                >
                  {item.user.info.firstName} {item.user.info.lastName}
                </SimpleCell>
              </div>
            )) : (
              <Div>
                <Spinner />
              </Div>
            )}
          </Card>
        </Div>
      </Panel>
    );
  }
}
