import React from "react";
import {Avatar, Snackbar, Text} from "@vkontakte/vkui";
import {Icon16Done} from "@vkontakte/icons";

import {changeSnackbar} from "src/store/app/actions";

export function passiveOfflineBonus(sum: number) {
  return (
    <Snackbar
      className="padding-button-snack success-snack"
      layout="vertical"
      onClose={() => changeSnackbar(null)}
      before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
    >
      <div>Пока тебя не было, мы заработали</div>
      <Text weight="medium">{sum} вакцины</Text>
    </Snackbar>
  );
};
