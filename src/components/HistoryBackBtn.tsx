import {
  PanelHeaderButton,
  platform,
  IOS
} from "@vkontakte/vkui";
import React from "react";

import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const osname = platform();

export default () => {
  return (
    <PanelHeaderButton onClick={() => window.history.back()}>
      {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
    </PanelHeaderButton>
  );
};
