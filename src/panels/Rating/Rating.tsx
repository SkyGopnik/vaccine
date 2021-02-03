import React, {ReactNode} from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Card,
  SimpleCell,
  Avatar,
  IconButton,
  Spinner,
  FormItem,
  FormStatus,
  PullToRefresh
} from '@vkontakte/vkui';

import {Icon28MoneySendOutline} from "@vkontakte/icons";

import {RatingReducerIterface} from "src/store/rating/reducers";
import {UserInterface} from "src/store/user/reducers";

import style from './Rating.scss';

interface IProps extends RatingReducerIterface {
  id: string,
  snackbar: ReactNode | null,
  user: UserInterface | null,
  changeModal(modal: string | null, modalData?: Object)
}

interface IState {
  ptr: boolean
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ptr: false
    };
  }

  async componentDidMount() {
    const { getRating } = this.props;

    await getRating(false);
  }

  async onRefresh() {
    const { getRating } = this.props;

    this.setState({ ptr: true });

    setTimeout(async () => {
      await getRating();

      this.setState({ ptr: false })
    }, 1000);
  }

  render() {
    const {
      id,
      user,
      list,
      snackbar,
      changeModal
    } = this.props;
    const { ptr } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader separator={false}>
          Рейтинг
        </PanelHeader>
        <PullToRefresh onRefresh={() => this.onRefresh()} isFetching={ptr}>
          {/*<Tabs>*/}
          {/*  <TabsItem selected>*/}
          {/*    Доктора*/}
          {/*  </TabsItem>*/}
          {/*  <TabsItem>*/}
          {/*    Больницы*/}
          {/*  </TabsItem>*/}
          {/*</Tabs>*/}
          {!list.loading && (user.data.balance !== (list.user && list.user.balance)) && (
            <FormItem>
              <FormStatus header="Данные отличаются" mode="error">
                Рейтинг может отображаться неточно, ты можешь обновить страницу, чтобы это исправить
              </FormStatus>
            </FormItem>
          )}
          <Div>
            <Card
              className={style.card}
              mode="shadow"
            >
              {!list.loading ? list.data.map((item, index) => (
                <div className={style.userItem} key={index}>
                  <div className={style.topNumber}>{index + 1}.</div>
                  <SimpleCell
                    target="_blank"
                    // href={`https://vk.com/skgopnik`}
                    before={<Avatar size={48} src={item.user.info.photo} />}
                    after={(item.userId !== list.user.userId) && (
                      <IconButton
                        icon={<Icon28MoneySendOutline />}
                        onClick={() => changeModal('transferMoney', item.user.info)}
                      />
                    )}
                    description={item.balance.toLocaleString()}
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
        </PullToRefresh>
        {snackbar}
      </Panel>
    );
  }
}
