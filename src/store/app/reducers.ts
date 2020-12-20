import {
  APP_CHANGE_VIEW,
  APP_CHANGE_PANEL,
  APP_CHANGE_VIEW_PANEL_STORY,
  APP_CHANGE_MODAL,
  APP_CHANGE_STORY,
  updateHistory
} from './actions';

export interface AppReducerIterface {
  view: string,
  panel: string,
  story: string,
  panelData: any,
  modal: string,
  modalData: any,
  changeView(view: string),
  changePanel(panel: string, panelData?: any),
  changeViewPanelStory(view: string, panel: string, story?: string, panelData?: any),
  changeModal(modal: null | string, modalData?: any),
  changeStory(story: string, panelData?: any),
  updateHistory(view: string, panel: string, story: string, history?: any)
}

const defaultState = {
  view: 'main',
  panel: 'main',
  story: 'game',
  panelData: null,
  modal: null,
  modalData: null
};

// Обновляем историю переходов (Ставим начальную страницу)
updateHistory(defaultState.view, defaultState.panel, defaultState.story);

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
  case APP_CHANGE_VIEW:
    return {
      ...state,
      view: action.payload.view
    };

  case APP_CHANGE_PANEL:
    updateHistory(state.view, action.payload.panel, action.payload.panelData);

    return {
      ...state,
      panel: action.payload.panel,
      panelData: action.payload.panelData
    };

  case APP_CHANGE_STORY:
    updateHistory(state.view, state.panel, action.payload.story, action.payload.panelData);

    return {
      ...state,
      story: action.payload.story,
      panelData: action.payload.panelData
    };

  case APP_CHANGE_VIEW_PANEL_STORY:
    return {
      ...state,
      view: action.payload.view,
      panel: action.payload.panel,
      story: action.payload.story,
      panelData: action.payload.panelData
    };

  case APP_CHANGE_MODAL:
    return {
      ...state,
      modal: action.payload.modal,
      modalData: action.payload.modalData
    };

  default:
    break;
  }

  return state;
};
