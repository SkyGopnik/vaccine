import queryGet from "src/functions/query_get";

export enum SupportTypes {
  Tasks,
  TransferFriends
}

export default class Support {
  public static check(supportType: SupportTypes) {
    let type = queryGet('reglis_type');

    if (supportType === SupportTypes.Tasks) {
      if (
        type === 'vk'
        || type === 'vk_game'
      ) {
        return true;
      }
    } else if (supportType === SupportTypes.TransferFriends) {
      if (
        type === 'vk'
        || type === 'vk_game'
      ) {
        return true;
      }
    }

    return false;
  }
}
