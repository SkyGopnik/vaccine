export const APP_CHANGE_VIEW = 'APP_CHANGE_VIEW';
export const APP_CHANGE_PANEL = 'APP_CHANGE_PANEL';
export const APP_CHANGE_VIEW_PANEL_STORY = 'APP_CHANGE_VIEW_PANEL_STORY';
export const APP_CHANGE_MODAL = 'APP_CHANGE_MODAL';
export const APP_CHANGE_STORY = 'APP_CHANGE_STORY';

export const changeView = (view: string) => {
  return {
    type: APP_CHANGE_VIEW,
    payload: {
      view
    }
  };
};

export const changePanel = (panel: string, panelData: Object = null) => {
  return {
    type: APP_CHANGE_PANEL,
    payload: {
      panel,
      panelData
    }
  };
};

export const changeStory = (story: string, panelData: Object = null) => {
  return {
    type: APP_CHANGE_STORY,
    payload: {
      story,
      panelData
    }
  };
};

export const changeViewPanelStory = (view: string, panel: string, story: string = null, panelData: Object = null) => {
  return {
    type: APP_CHANGE_VIEW_PANEL_STORY,
    payload: {
      view,
      panel,
      story,
      panelData
    }
  };
};

export const changeModal = (modal: null | string, modalData?: Object, isPopstate?: boolean) => {
  return {
    type: APP_CHANGE_MODAL,
    payload: {
      modal,
      modalData,
      isPopstate
    }
  };
};

export const updateHistory = (view: string, panel: string, story: string = null, data?: any) => {
  window.history.pushState({ view, panel, story, data: data ? JSON.stringify(data) : null, modal: null, modalData: null }, `${view}/${panel}/${story}/null`);
}
