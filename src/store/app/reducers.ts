import {
  APP_CHANGE_VIEW,
  APP_CHANGE_PANEL,
  APP_CHANGE_VIEW_PANEL_STORY,
  APP_CHANGE_MODAL,
  APP_CHANGE_STORY,
  APP_CHANGE_SNACKBAR,
  APP_CHANGE_POPOUT,
  updateHistory
} from './actions';
import {ReactNode} from "react";

let modalTime = new Date().getTime();

export interface AppReducerInterface {
  view?: string,
  viewData?: any,
  panel?: string,
  panelData?: any,
  story?: string,
  modal?: string,
  modalData?: any,
  popout?: string,
  snackbar?: ReactNode | null,
  changeView?(view: string, viewData?: any),
  changePanel?(panel: string, panelData?: any),
  changeViewPanelStory?(view: string, panel: string, story?: string, panelData?: any, isPopstate?: boolean),
  changeModal?(modal: null | string, modalData?: any, isPopstate?: boolean),
  changePopout?(popout: ReactNode | null, isPopstate?: boolean),
  changeStory?(story: string, panelData?: any),
  changeSnackbar?(snackbar: ReactNode | null),
  updateHistory?(view: string, panel: string, story: string, history?: any)
}

const defaultState = {
  view: 'loading',
  panel: 'main',
  story: 'game',
  panelData: null,
  viewData: null,
  modal: null,
  modalData: null,
  popout: null,
  snackbar: null
};

// Обновляем историю переходов (Ставим начальную страницу)
updateHistory('main', defaultState.panel, defaultState.story);

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
  case APP_CHANGE_VIEW:
    return {
      ...state,
      view: action.payload.view,
      viewData: action.payload.viewData,
      modal: null,
      popout: null,
      snackbar: null
    };

  case APP_CHANGE_PANEL:
    updateHistory(state.view, action.payload.panel, state.story, action.payload.panelData);

    try {
      window.scroll({ top: 0, behavior: 'auto' });
    } catch (e) {
      console.log(e);
    }

    return {
      ...state,
      modal: null,
      panel: action.payload.panel,
      panelData: action.payload.panelData,
      snackbar: !action.payload.snackbarTabNotification ? state.snackbar : null
    };

  case APP_CHANGE_STORY:
    // console.log(action.payload.)

    if (state.story !== action.payload.story) {
      window.history.pushState({
        view: state.view,
        panel: 'main',
        story: action.payload.story,
        data: JSON.stringify(action.payload.panelData),
        modal: state.modal,
        modalData: JSON.stringify(state.modalData)
      }, `${state.view}/${state.panel}/${action.payload.story}/${state.modal}`);
    }

    try {
      window.scroll({ top: 0, behavior: state.story === action.payload.story ? 'smooth' : 'auto' });
    } catch (e) {
      console.log(e);
    }

    return {
      ...state,
      story: action.payload.story,
      panel: 'main',
      panelData: action.payload.panelData,
      modal: null,
      popout: null,
      snackbar: !action.payload.snackbarTabNotification ? state.snackbar : null
    };

  case APP_CHANGE_VIEW_PANEL_STORY:
    return {
      ...state,
      modal: !action.payload.isPopstate ? null : state.modal,
      popout: !action.payload.isPopstate ? null : state.popout,
      view: action.payload.view,
      panel: action.payload.panel,
      story: action.payload.story,
      panelData: action.payload.panelData
    };

  case APP_CHANGE_MODAL:
    if (!action.payload.isPopstate) {
      window.history.pushState({
        view: state.view,
        panel: state.panel,
        story: state.story,
        data: JSON.stringify(state.panelData),
        modal: action.payload.modal,
        modalData: JSON.stringify(action.payload.modalData)
      }, `${state.view}/${state.panel}/${state.story}/${action.payload.modal}`);
    }

    const currentTime = new Date().getTime();

    if ((currentTime - modalTime) < 700) {
      return {
        ...state
      };
    }

    if (action.payload.modal) {
      modalTime = new Date().getTime();
    }

    return {
      ...state,
      modal: action.payload.modal,
      modalData: action.payload.modalData ? action.payload.modalData : state.modalData // Если данные не меняются, то оставляем их
    };

    case APP_CHANGE_POPOUT:
      // if (!action.payload.isPopstate) {
      //   window.history.pushState({
      //     view: state.view,
      //     panel: state.panel,
      //     story: state.story,
      //     data: JSON.stringify(state.panelData),
      //     modal: state.modal,
      //     modalData: JSON.stringify(state.modalData)
      //   }, `${state.view}/${state.panel}/${state.story}/${state.modal}`);
      // }

      return {
        ...state,
        popout: action.payload.popout
      };

  case APP_CHANGE_SNACKBAR:
    return {
      ...state,
      snackbar: action.payload
    };

  default:
    break;
  }

  return state;
};
