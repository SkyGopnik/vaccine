import React from 'react';
import {
  Panel,
  Gallery,
  Button,
  Div,
  Placeholder
} from '@vkontakte/vkui';

import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";

import {AppReducerInterface} from "src/store/app/reducers";

import Img1 from 'src/img/No-virus.svg';
import Img2 from 'src/img/MainIcon.svg';
import Img3 from 'src/img/Friends.svg';

import style from './Onboard.scss';

interface IProps extends AppReducerInterface {
  id: string,
  changeAdditional(data: object)
}

interface IState {
  slideIndex: number
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      slideIndex: 0
    };

    this.next = this.next.bind(this);
    this.finish = this.finish.bind(this);
  }

  componentDidMount() {
    console.log('onBoard bug');
  }

  next(e) {
    const { index } = e.currentTarget.dataset;

    this.setState({
      slideIndex: Number(index)
    });
  }

  async finish() {
    const {
      changeView,
      changeAdditional
    } = this.props;

    await changeAdditional({
      onboard: true
    });

    changeView('main');
  }

  render() {
    const { id } = this.props;
    const { slideIndex } = this.state;

    return (
      <Panel id={id}>
        <EmptyBackground />
        <Gallery
          className={style.gallery}
          align="center"
          bullets="dark"
          slideIndex={slideIndex}
          onChange={slideIndex => this.setState({slideIndex})}
        >
          <div className={style.slide}>
            <div className={style.placeholder}>
              <Placeholder
                icon={<img src={Img1} alt=""/>}
                header="Спасите мир от вируса"
              >
                <div>Пришло время взяться за спасение планеты.</div>
                <div>Но справишься ли ты?</div>
              </Placeholder>
            </div>
            <Div>
              <Button
                size="l"
                data-index="1"
                onClick={this.next}
                stretched
              >
                Да, готов!
              </Button>
            </Div>
          </div>
          <div className={style.slide}>
            <div className={style.placeholder}>
              <Placeholder
                icon={<img src={Img2} alt=""/>}
                header="Разработайте вакцину"
              >
                Учёные всего мира заняты разработкой вакцины. Настала и твоя очередь!
              </Placeholder>
            </div>
            <Div>
              <Button
                size="l"
                data-index="2"
                onClick={this.next}
                stretched
              >
                Ок, дальше!
              </Button>
            </Div>
          </div>
          <div className={style.slide}>
            <div className={style.placeholder}>
              <Placeholder
                icon={<img src={Img3} alt=""/>}
                header="Защити своих друзей"
              >
                Подари друзьям долгожданную вакцину, получив за это ещё больше очков!
              </Placeholder>
            </div>
            <Div>
              <Button
                size="l"
                onClick={this.finish}
                stretched
              >
                Поехали!
              </Button>
            </Div>
          </div>
        </Gallery>
      </Panel>
    );
  }
}
