import React from 'react';

// Панели
import LoadingPanel from '../panels/Loading/Loading';

import {View} from "@vkontakte/vkui";

interface IProps {
  id: string
}

export default (props: IProps) => {
  return (
    <View
      id={props.id}
      activePanel="main"
    >
      <LoadingPanel id="main" />
    </View>
  );
}
