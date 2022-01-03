import bridge from '@vkontakte/vk-bridge';

import queryGet from 'src/functions/query_get';
import {config} from "src/js/config";

let type = queryGet('reglis_type');

const bridgeSupport = ["vk", "vk_game", "ok"];

export default class platformApi {
  public static currentType() {
    return type;
  }

  public static subscribeGroup(cb?: Function) {
    if (bridgeSupport.indexOf(type) !== -1) {
      bridge.send("VKWebAppJoinGroup", {
        "group_id": 191809582
      }).then((res) => cb(res)).catch((err) => cb(err));
    }
  }

  public static shareRef(userId: string, cb?: Function) {
    if (bridgeSupport.indexOf(type) !== -1) {
      bridge.send("VKWebAppShare", {
        "link": `${config.appUrl}#ref=${userId}`
      }).then((res) => cb(res)).catch((err) => cb(err));
    }
  }

  public static sharePost(text: string, cb?: Function) {
    if (bridgeSupport.indexOf(type) !== -1) {
      bridge.send("VKWebAppShowWallPostBox", {
        "message": text,
        "attachments": config.appUrl
      }).then((res) => cb(res)).catch((err) => cb(err));
    }
  }

  public static checkSupport() {
    if (bridgeSupport.indexOf(type) !== -1) {
      return queryGet('vk_platform') !== 'mobile_web';
    }

    return false;
  }

  public static changeViewSettings(status: 'light' | 'dark', color?: string, cb?: Function) {
    if (bridgeSupport.indexOf(type) !== -1) {
      bridge.send(
        'VKWebAppSetViewSettings',
        {
          'status_bar_style': status,
          'action_bar_color': color
        }
      ).then((res) => cb && cb(res)).catch((err) => cb && cb(err));
    }
  }

  public static copyToClipboard(text: string, cb?: Function) {
    if (bridgeSupport.indexOf(type) !== -1) {
      bridge.send(
        "VKWebAppCopyText",
        {
          "text": text
        }
      ).then((res) => cb && cb(res)).catch((err) => cb && cb(err));
    }
  }

  public static getHref(type: string, id: string) {
    switch (type) {
      case 'vk':
      case 'vk_game':
        return 'https://vk.com/id' + id;
      case 'ok':
        return 'https://ok.ru/profile/' + id;
    }
  }

  public static scrollToTop() {
    // функция
  }
}
