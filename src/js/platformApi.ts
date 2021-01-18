import bridge from '@vkontakte/vk-bridge';

import queryGet from 'src/functions/query_get';
import {changeSnackbar} from "src/store/app/actions";
import {config} from "src/js/config";

let platform = queryGet('reglis_platform');

export default class platformApi {
  public static subscribeGroup(cb?: Function) {
    if (
      platform === 'vk'
      || platform === 'vk_game'
    ) {
      bridge.send("VKWebAppJoinGroup", {
        "group_id": 191809582
      }).then((res) => cb(res)).catch((err) => cb(err));
    }
  }

  public static shareRef(userId: string, cb?: Function) {
    if (
      platform === 'vk'
      || platform === 'vk_game'
    ) {
      bridge.send("VKWebAppShare", {
        "link": `${config.appUrl}#ref=${userId}`
      }).then((res) => cb(res)).catch((err) => cb(err));
    }
  }
}
