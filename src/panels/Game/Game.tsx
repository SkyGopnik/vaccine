import React from 'react';
import {
  Panel,
  Progress,
  Caption,
  Title
} from '@vkontakte/vkui';

import Img1 from 'src/img/Cylinder.png';
import Img2 from 'src/img/Dish.png';
import Img3 from 'src/img/Genetics.png';
import Img4 from 'src/img/Mask.png';
import Img5 from 'src/img/No-virus.png';
import Img6 from 'src/img/Syringe.png';

import MainIcon from "src/components/MainIcon";

import {AppReducerIterface} from "src/store/app/reducers";

import style from './Game.scss';

interface IProps extends AppReducerIterface {
  id: string
}

interface IState {
  isClick: boolean
}

let timer;

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isClick: false
    };
  }

  componentWillUnmount() {
    clearTimeout(timer);
  }

  render() {
    const { id } = this.props;
    const { isClick } = this.state;

    return (
      <Panel id={id}>
        <div className={style.bg}>
          <div className={style.blur} />
          <div className={style.images}>
            <img className={style.left} src={Img5} alt="" />
            <img className={style.left} src={Img1} alt="" />
            <img className={style.right}  src={Img3} alt="" />
            <img className={style.left} src={Img2} alt="" />
            <img className={style.right} src={Img4} alt="" />
            <img className={style.right} src={Img6} alt="" />
          </div>
        </div>
        <div className={style.info}>
          {/*64px top*/}
          <div className={style.balance}>
            <Caption
              level="1"
              weight="semibold"
              caps
            >
              Баланс
            </Caption>
            <Title
              level="1"
              weight="bold"
            >
              15327,35
            </Title>
          </div>
          <div className={style.stat}>
            <Caption
              level="1"
              weight="semibold"
            >
              + 73,5/сек
            </Caption>
            <Caption
              level="1"
              weight="semibold"
            >
              + 327/клик
            </Caption>
          </div>
        </div>
        <div className={style.iconWithProgress}>
          <MainIcon
            className={style.icon}
          />
          <Progress className={style.progress} value={40} />
        </div>
      </Panel>
    );
  }
}
