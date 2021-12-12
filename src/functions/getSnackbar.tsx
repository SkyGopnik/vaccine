import React from "react";
import {Avatar, Snackbar, Text} from "@vkontakte/vkui";
import {Icon16Cancel, Icon16Done} from "@vkontakte/icons";

import { store } from 'src/js'

import {changeSnackbar} from "src/store/app/actions";
import {UserInterface} from "src/store/user/reducers";

import {locale} from "src/functions/balanceFormat";

interface transferGet {
  data: UserInterface,
  sum: number
}

interface newFriend {
  data: UserInterface,
  sum: number
}

export default function declBySex(sex: 0 | 1 | 2, array: Array<string>) {
  return array[sex];
}

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


export function transferGet(data: transferGet) {
  return(
    <Snackbar
    className='success-snack'
    layout='vertical'
    onClose={() => store.dispatch(changeSnackbar(null))}
    before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
  >
    <div>{data.data.info.firstName} {data.data.info.lastName} {declBySex(data.data.info.sex, ['передал (a)', 'передала', 'передал'])} тебе {locale(data.sum)} вакцины</div>
  </Snackbar>
  )
}

export function newFriend(data: newFriend) {
  return(
    <Snackbar
    className='success-snack'
    layout='vertical'
    onClose={() => store.dispatch(changeSnackbar(null))}
    before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
  >
    <div>Ты получил {locale(data.sum)} вакцины за нового друга </div>
  </Snackbar>
  )
}

export function captchaSuccess(bonus: number) {
  return(
    <Snackbar
      className='success-snack'
      layout='vertical'
      onClose={() => store.dispatch(changeSnackbar(null))}
      before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
    >
      <div>Ты получил {locale(bonus)} вакцины за прохождение мини-игры</div>
    </Snackbar>
  )
}

export function captchaFailed() {
  return(
    <Snackbar
      className="error-snack"
      layout="vertical"
      onClose={() => store.dispatch(changeSnackbar(null))}
      before={<Avatar size={24} style={{background: 'var(--destructive)'}}><Icon16Cancel fill="#fff" width={14} height={14}/></Avatar>}
    >
      Мини-игра не была пройдена, в следующий раз будь внимательнее, иначе это может повлечь наказание
    </Snackbar>
  )
}

export function newLevel(level: number) {
  return(
    <Snackbar
      className='success-snack'
      layout='vertical'
      onClose={() => store.dispatch(changeSnackbar(null))}
      before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
    >
      <div>Ты получил {level} уровень</div>
    </Snackbar>
  )
}
