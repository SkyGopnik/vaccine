import React from 'react';

// Панели
import OnboardPanel from '../panels/Onboard/OnboardContainer';

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
      <OnboardPanel id="main" />
    </View>
  );
}
