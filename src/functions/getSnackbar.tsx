import React from "react";
import {Avatar, Snackbar, Text} from "@vkontakte/vkui";
import {Icon16Done} from "@vkontakte/icons";

import { store } from 'src/js'

import {changeSnackbar} from "src/store/app/actions";

import {locale} from "src/functions/balanceFormat";

export function passiveOfflineBonus(sum: number) {
  return (
    <Snackbar
      className="success-snack"
      layout="vertical"
      onClose={() => store.dispatch(changeSnackbar(null))}
      before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
    >
      <div>Пока тебя не было, мы заработали</div>
      <Text weight="medium">{locale(sum)} вакцины</Text>
    </Snackbar>
  );
};
