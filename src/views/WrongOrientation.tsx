import React from 'react';
import {
  Panel,
  Placeholder,
  View
} from "@vkontakte/vkui";

import EmptyBackground from "src/components/EmptyBackground/EmptyBackground";
import Error from "src/img/Error.png";

import style from "src/panels/Error/Error.scss";

interface IProps {
  id: string
}

export default (props: IProps) => {
  return (
    <View
      id={props.id}
      activePanel="main"
    >
      <Panel id="main">
        <EmptyBackground />
        <div className={style.middle}>
          <Placeholder
            icon={<img src={Error} alt=""/>}
            header="Я не хочу работать в таких условиях"
          >
            Скажи одно, зачем был нужен этот переворот? Нормально же общались (поверни телефон обратно)
          </Placeholder>
        </div>
      </Panel>
    </View>
  );
}
