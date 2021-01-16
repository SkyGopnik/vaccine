import React from 'react';

// Панели
import ErrorPanel from '../panels/Error/ErrorContainer';

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
      <ErrorPanel id="main" />
    </View>
  );
}
