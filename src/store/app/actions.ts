import {ReactNode} from "react";

import { store } from 'src/js';

export const APP_CHANGE_VIEW = 'APP_CHANGE_VIEW';
export const APP_CHANGE_PANEL = 'APP_CHANGE_PANEL';
export const APP_CHANGE_VIEW_PANEL_STORY = 'APP_CHANGE_VIEW_PANEL_STORY';
export const APP_CHANGE_MODAL = 'APP_CHANGE_MODAL';
export const APP_CHANGE_POPOUT = 'APP_CHANGE_POPOUT';
export const APP_CHANGE_STORY = 'APP_CHANGE_STORY';
export const APP_CHANGE_SNACKBAR = 'APP_CHANGE_SNACKBAR';

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

export const changeViewPanelStory = (view: string, panel: string, story: string = null, panelData: Object = null, isPopstate?: boolean) => {
  return {
    type: APP_CHANGE_VIEW_PANEL_STORY,
    payload: {
      view,
      panel,
      story,
      panelData,
      isPopstate
    }
  };
};

export const changeModal = (modal: null | string, modalData?: Object, isPopstate?: boolean) => {
  const { app } = store.getState();

  if (app.view === 'main') {
    // Блокировка и разблокировка скрола при открытии модалки
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = modal ? 'hidden' : 'scroll';

    return {
      type: APP_CHANGE_MODAL,
      payload: {
        modal,
        modalData,
        isPopstate
      }
    };
  }
};

export const changePopout = (popout: null | string, isPopstate?: boolean) => {
  const { app } = store.getState();

  if (app.view === 'main') {
    // Блокировка и разблокировка скрола при открытии модалки
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = popout ? 'hidden' : 'scroll';

    return {
      type: APP_CHANGE_POPOUT,
      payload: {
        popout,
        isPopstate
      }
    };
  }
};

export const updateHistory = (view: string, panel: string, story: string = null, data?: any) => {
  window.history.pushState({ view, panel, story, data: data ? JSON.stringify(data) : null, modal: null, modalData: null }, `${view}/${panel}/${story}/null`);
};

export const changeSnackbar = (snackbar: ReactNode | null) => ({
  type: APP_CHANGE_SNACKBAR,
  payload: snackbar
});
