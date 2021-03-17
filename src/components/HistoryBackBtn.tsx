import {
  PanelHeaderButton,
  platform,
  IOS
} from "@vkontakte/vkui";
import React from "react";

import {Icon24Back, Icon28ChevronBack} from "@vkontakte/icons";

const osname = platform();

export default () => {
  return (
    <PanelHeaderButton onClick={() => window.history.back()}>
      {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
    </PanelHeaderButton>
  );
};
