export const SYNC_USER = 'SYNC_USER';

export const syncUser = (data: object) => {
  return {
    type: SYNC_USER,
    payload: {
      ...data
    }
  };
};
