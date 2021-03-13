import React, {ReactNode} from "react";
import {
  Panel,
  PanelHeader,
  Div,
  Title,
  Text,
  Subhead,
  Header,
  Input,
  Button,
  Spacing, Avatar, Snackbar
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Card from 'src/components/Card/Card';

import Img5 from "src/img/profile/5.svg";
import Img6 from "src/img/profile/6.svg";

import {Icon16Done, Icon28Send} from '@vkontakte/icons';

import {ProfileReducerInterface} from "src/store/profile/reducers";

import {locale} from "src/functions/balanceFormat";

import platformApi from "src/js/platformApi";

import style from "./Ref.scss";

interface IProps extends ProfileReducerInterface {
  id: string,
  snackbar: ReactNode | null,
  changeSnackbar(snackbar: ReactNode | null)
}

export default class extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};

    this.copyCode = this.copyCode.bind(this);
  }

  copyCode() {
    const { data, changeSnackbar } = this.props;

    platformApi.copyToClipboard(String(data.stat.refCode), (res) => {
      if (res.result) {
        changeSnackbar(
          <Snackbar
            className="success-snack"
            layout="vertical"
            onClose={() => changeSnackbar(null)}
            before={
              <Avatar size={24} style={{background: '#fff'}}>
                <Icon16Done fill="#6A9EE5" width={14} height={14} />
              </Avatar>
            }
          >
            Код успешно скопирован в буфер обмена
          </Snackbar>
        );
      }
    });
  }

  render() {
    const { id, data, snackbar, changeSnackbar } = this.props;
    const { stat } = data;

    return (
      <Panel id={id}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Спасиние друзей
        </PanelHeader>
        <Div className={style.block}>
          <Text weight="regular">Скопируй код и покажи его другу. За каждое приглашение ты и твой друг получите бонусную вакцину. Спаси своих друзей!</Text>
          <Card>
            <div className={style.ref} onClick={this.copyCode}>
              <Title level="1" weight="semibold">{stat.refCode || 0}</Title>
              <Subhead weight="regular">Нажми на код, чтобы скопировать его</Subhead>
            </div>
          </Card>
          <Card
            icon={<img src={Img5} alt="" />}
            title="Статистика"
          >
            <Subhead weight="regular">
              <div>· Спасено друзей: {stat.saveFriends || 0}</div>
              <div>· Получено вакцины от друзей: {stat.transfer && locale(stat.transfer) || 0}</div>
            </Subhead>
          </Card>
        </Div>
        <Div className={style.block}>
          <Header mode="secondary">У меня есть код приглашения</Header>
          <Text weight="regular">Есть код? Ура — ты спасён. Осталось лишь ввести этот код от друга сюда. За это ты получишь подарок.</Text>
          <Card
            icon={<img src={Img6} alt="" />}
            title="Ввести код"
          >
            <Subhead weight="regular">
              <div className={style.input}>
                <Input placeholder="11928" />
                <Button className={style.input}>
                  <Icon28Send />
                </Button>
              </div>
            </Subhead>
          </Card>
          <Spacing size={55} />
        </Div>
        {snackbar}
      </Panel>
    );
  }
}
