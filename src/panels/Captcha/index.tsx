import React from 'react';
import {
  Panel, PanelHeader, Div, Card, Button
} from '@vkontakte/vkui';

import {AppReducerInterface} from "src/store/app/reducers";
import {changeView} from "src/store/app/actions";
import {connect} from "react-redux";
import CustomCard from "src/components/Card/Card";

import style from "./index.module.scss";
import {classNames} from "@vkontakte/vkjs";
import {sendWsMessage} from "src/store/webSocket/actions";
import {WebSocketReducerInterface} from "src/store/webSocket/reducers";

interface IProps extends AppReducerInterface, WebSocketReducerInterface {
  id: string
}

interface IState {
  activeIndex: null | number
}

export class Captcha extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      activeIndex: null
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.checkCaptcha = this.checkCaptcha.bind(this);
  }

  handleImageClick(e) {
    const { activeIndex } = this.state;
    const { index } = e.currentTarget.dataset;

    const _index = Number(index);

    if (activeIndex === _index) {
      return;
    }

    this.setState({
      activeIndex: _index
    });
  }

  checkCaptcha() {
    const { changeView, sendWsMessage } = this.props;
    const { activeIndex } = this.state;

    sendWsMessage({
      type: 'PassCaptcha',
      index: activeIndex
    });

    changeView('main');
  }

  render() {
    const { id, viewData } = this.props;
    const { activeIndex } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader separator={false}>Мини игра</PanelHeader>
        <Div className={style.captcha}>
          <CustomCard title="Как играть?" description="Вам необходимо выбрать колбу с готовой вакциной." />
          <div className={style.list}>
            {viewData && viewData.map((img, index) => (
              <Card
                className={classNames(style.item, index === activeIndex && style.itemActive)}
                key={index}
                data-index={index}
                mode="shadow"
                onClick={this.handleImageClick}
              >
                <div className={style.crop}>
                  <img src={img} alt="" />
                </div>
              </Card>
            ))}
          </div>
          <Button
            className={style.checkBtn}
            size="l"
            disabled={activeIndex === null}
            stretched
            onClick={this.checkCaptcha}
          >
            Проверить
          </Button>
        </Div>
      </Panel>
    );
  }
}

export default connect((state: any) => ({
  ...state.app
}), {
  changeView,
  sendWsMessage
})(Captcha);
