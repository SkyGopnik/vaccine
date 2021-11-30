import React from 'react';

import CaptchaPanel from 'src/panels/Captcha';

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
      <CaptchaPanel id="main" />
    </View>
  );
}
