import React, {ReactNode} from "react";
import axios from "axios";
import lo from "lodash";
import Decimal from "decimal.js";
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
  Avatar,
  Snackbar,
  FormItem,
  Spinner, IconButton, SimpleCell
} from "@vkontakte/vkui";

import HistoryBackBtn from "src/components/HistoryBackBtn";
import Card from 'src/components/Card/Card';

import Img5 from "src/img/profile/5.svg";
import Img6 from "src/img/profile/6.svg";
import Img7 from "src/img/Friends.svg";

import {Icon16Cancel, Icon16Done, Icon28MoneySendOutline, Icon28Send} from '@vkontakte/icons';

import {ProfileReducerInterface, RefHistoryInterface} from "src/store/profile/reducers";
import {UserInterface} from "src/store/user/reducers";
import {AppReducerInterface} from "src/store/app/reducers";
import {ReferReducerInterface} from "src/store/ref/reducers";

import {locale} from "src/functions/balanceFormat";
import isset from "src/functions/isset";

import Spacing from "src/components/Spacing";

import platformApi from "src/js/platformApi";

import style from "./Ref.module.scss";

interface IProps extends ProfileReducerInterface, AppReducerInterface, ReferReducerInterface {
  id: string,
  snackbar: ReactNode | null,
  user: UserInterface,
  syncUser(data: UserInterface),
  changeSnackbar(snackbar: ReactNode | null),
  sendWsMessage(data: object)
}

interface IState {
  value: null | string,
  error: string,
  loading: boolean
}

const localization = {
  "Referral isn't exist": "Реферального кода не существует",
  "What are you doing here?": "Зачем ты вводишь свой же реферальный код?",
  "Ref was activated": "Вы уже активировали этот реферальный код"
};

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: '',
      error: undefined,
      loading: false
    };

    this.copyCode = this.copyCode.bind(this);
    this.activateRef = this.activateRef.bind(this);
  }

  async componentDidMount() {
    const { getRef } = this.props;

    this.updateCode();

    await getRef();
  }

  updateCode() {
    const { data } = this.props;
    const { additional } = data;

    this.setState({
      loading: false,
      value: additional.code ? additional.code : '',
      error: undefined
    });
  }

  copyCode() {
    const { refer, changeSnackbar } = this.props;

    platformApi.copyToClipboard(String(refer.code), (res) => {
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
            Код скопирован. Отправь его другу, чтобы он мог вставить его в этом разделе
          </Snackbar>
        );
      }
    });
  }

  handleInputChange(value: string) {
    const sendError = (error: string) => {
      throw error;
    };

    let error = '';

    try {
      if (value.length === 0) {
        sendError(undefined);
      }

      if (Number(value) <= 0) {
        sendError('Код должен быть больше 0');
      }

      if (value.length >= 10) {
        sendError('Код должен быть меньше 10 символов');
      }

      if (!/^\d+$/.test(value)) {
        sendError('Неправильный формат');
      }
    } catch (e) {
      error = e;
    }

    this.setState({
      value,
      error
    });
  }

  async activateRef() {
    const {
      user,
      syncUser,
      getProfile,
      changeSnackbar
    } = this.props;
    const { value } = this.state;

    this.setState({
      loading: true
    });

    try {
      const { data } = await axios.post('/v1/ref', {
        code: value
      });

      // Обновляем себе баланс
      syncUser(lo.merge(user, {
        data: {
          balance: new Decimal(user.data.balance).plus(data.bonusUser)
        }
      }));

      await getProfile(false);

      changeSnackbar(
        <Snackbar
          className="success-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
        >
          <div>Реферальный код активирован</div>
          <Text weight="medium">Получено {locale(data.bonusUser)} вакцины</Text>
        </Snackbar>
      );
    } catch (e) {
      console.log(e.response.data.message);
      changeSnackbar(
        <Snackbar
          className="error-snack"
          layout="vertical"
          onClose={() => changeSnackbar(null)}
          before={<Avatar size={24} style={{background: 'var(--destructive)'}}><Icon16Cancel fill="#fff" width={14} height={14}/></Avatar>}
        >
          {localization[e.response.data.message]}
        </Snackbar>
      );
    }

    this.updateCode();
  }

  render() {
    const { id, data, user, refer, snackbar, changeModal, changePanel } = this.props;
    const {
      value,
      error,
      loading
    } = this.state;
    const { stat, additional } = data;
    const { code, history } = refer || {};

    const refDisabled = loading || additional.code || user.data.level <= 1;
    const refBtnDisabled = value.length === 0;

    return (
      <Panel id={id} className={style.ref}>
        <PanelHeader left={<HistoryBackBtn />} separator={false}>
          Спасение друзей
        </PanelHeader>
        {!refer.loading ? (
          <>
            <Div className={style.block}>
              <Header mode="secondary">Хочу бонус за друга</Header>
              <Text weight="regular">Для того чтобы твой друг получил бонус, ему необходимо самостоятельно достигнуть 2 уровня в игре, после чего он сможет активировать твой код и вы вместе получите бонус! Не тормози, спаси своих друзей!</Text>
              <Card>
                <div className={style.refCode} onClick={this.copyCode}>
                  <Title level="1" weight="semibold">{code || 0}</Title>
                  <Subhead weight="regular">Нажми на код, чтобы скопировать его</Subhead>
                </div>
              </Card>
              <Card
                icon={<img src={Img5} alt="" />}
                title="Статистика"
              >
                <Subhead weight="regular">
                  <div>· Спасено друзей: {stat.savedFriends || 0}</div>
                  <div>· Получено вакцины за друзей: {locale(refer.stat)}</div>
                </Subhead>
              </Card>
              {history.length !== 0 && (
                <Card
                  icon={<img src={Img7} alt="" />}
                  title="Друзья"
                >
                  {history.map((item, index) => (
                    <SimpleCell
                      className={style.userItem}
                      key={index}
                      before={
                        <Avatar
                          className={style.avatar}
                          size={48}
                          src={item.user.info.photo}
                          onClick={() => changePanel('user', item)}
                        />
                      }
                      after={(item.user.id !== user.id) && (
                        <IconButton
                          className={style.transferIcon}
                          icon={<Icon28MoneySendOutline />}
                          onClick={() => changeModal('transferMoney', item.user.info)}
                        />
                      )}
                      description={locale(item.user.data.balance)}
                      multiline
                      disabled
                    >
                      <div className={style.name} onClick={() => changePanel('user', item)}>{item.user.info.firstName} {item.user.info.lastName}</div>
                    </SimpleCell>
                  ))}
                </Card>
              )}
            </Div>
            <Div className={style.block}>
              <Header mode="secondary">У меня есть код</Header>
              {user.data.level <= 1 ? (
                <Text weight="regular">К сожалению, сначала ты должен достигнуть 2 уровня в игре, чтобы активировать код.</Text>
              ) : (
                <Text weight="regular">Есть код? Ура — ты спасён. Осталось лишь ввести этот код от друга сюда. За это ты получишь подарок.</Text>
              )}
              <Card
                icon={<img src={Img6} alt="" />}
                title="Ввести код"
              >
                <FormItem
                  className={style.input}
                  status={isset(error) ? (error === '' ? 'valid' : 'error') : 'default'}
                  bottom={error ? error : null}
                >
                  <div className={style.code}>
                    <Input
                      value={value}
                      type="number"
                      placeholder="11928"
                      disabled={refDisabled}
                      onChange={(e) => this.handleInputChange(e.currentTarget.value)}
                    />
                    <Button
                      disabled={refDisabled || refBtnDisabled}
                      stretched
                      onClick={this.activateRef}
                    >
                      {!loading ? <Icon28Send /> : <Spinner style={{ color: '#fff' }} size="small" />}
                    </Button>
                  </div>
                </FormItem>
              </Card>
              <Spacing size={110} />
            </Div>
          </>
        ) : (
          <Div>
            <Spinner />
          </Div>
        )}
        {snackbar}
      </Panel>
    );
  }
}
