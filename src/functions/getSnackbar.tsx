import React from "react";
import {Avatar, Snackbar, Text} from "@vkontakte/vkui";
import {Icon16Cancel, Icon16Done} from "@vkontakte/icons";

import { store } from 'src/js'

import {changePanel, changeSnackbar} from "src/store/app/actions";
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
      <div><span style={{fontWeight: 500}}>{data.data.info.firstName} {data.data.info.lastName}</span> {declBySex(data.data.info.sex, ['передал (a)', 'передала', 'передал'])} тебе <span style={{fontWeight: 500}}>{locale(data.sum)}</span> вакцины</div>
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
      <div>Ты получил <span style={{fontWeight: 500}}>{locale(data.sum)}</span> вакцины за нового друга </div>
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
      <div>Ты получил <span style={{fontWeight: 500}}>{locale(bonus)}</span> вакцины за прохождение мини-игры</div>
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
      <div>Ты достиг <span style={{fontWeight: 500}}>{level}</span> уровня</div>
      <Text weight="medium" onClick={() => store.dispatch(changePanel('levels'))}>Получить бонус</Text>
    </Snackbar>
  )
}

export function levelBonus(level: number) {
  return(
    <Snackbar
      className='success-snack'
      layout='vertical'
      onClose={() => store.dispatch(changeSnackbar(null))}
      before={<Avatar size={24} style={{background: '#fff'}}><Icon16Done fill="#6A9EE5" width={14} height={14}/></Avatar>}
    >
      <div>Бонус за <span style={{fontWeight: 500}}>{level}</span> уровень получен</div>
    </Snackbar>
  )
}
