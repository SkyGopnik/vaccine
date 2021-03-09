import React from 'react';
import {
  Panel,
  Title
} from '@vkontakte/vkui';

import platformApi from 'src/js/platformApi';
import queryGet from 'src/functions/query_get';

import Bg from 'src/img/loading/bg.svg';
import FireLeft from 'src/img/loading/fireLeft.svg';
import FireRight from 'src/img/loading/fireRight.svg';
import Logo from 'src/img/loading/logo.svg';
import Virus from 'src/img/loading/Virus.svg';
import Aaaa from 'src/img/loading/Aaaa.svg';

import style from './Loading.scss';

interface IProps {
  id: string
}

interface IState {
  dots: string
}

let timer;

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      dots: ''
    };
  }

  componentDidMount() {
    const platform = queryGet('vk_platform');

    if (platform === 'mobile_iphone' || platform === 'mobile_iphone_messenger') {
      platformApi.changeViewSettings('light', '#19191a');
    }

    timer = setInterval(() => {
      const { dots } = this.state;

      this.setState({
        dots: dots.length < 3 ? (dots + '.') : ''
      });
    }, 1000);
  }

  componentWillUnmount() {
    const platform = queryGet('vk_platform');

    if (platform === 'mobile_iphone' || platform === 'mobile_iphone_messenger') {
      platformApi.changeViewSettings('dark', '#ffffff');
    }

    clearInterval(timer);
  }

  render() {
    const { id } = this.props;
    const { dots } = this.state;

    return (
      <Panel id={id}>
        <div className={style.bg}>
          <img className={style.img} src={Bg} alt="" />
          <div className={style.fire}>
            <img src={FireLeft} alt="" />
            <img src={FireRight} alt="" />
          </div>
          <div className={style.middle}>
            <div><img src={Logo} alt="" /></div>
            <div>
              <Title level="3" weight="semibold">Загружаемся{dots}</Title>
            </div>
          </div>
          <div className={style.top}>
            <img src={Virus} alt="" />
            <img src={Aaaa} alt=""/>
          </div>
        </div>
      </Panel>
    );
  }
}
