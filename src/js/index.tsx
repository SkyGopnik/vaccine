import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import eruda from "eruda";

import queryGet from 'src/functions/query_get';

import { config } from 'src/js/config';

// Import scroll helper for safari
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';

// Главный файл
import AppContainer from '../pages/AppContainer';

// Главный reducer
import rootReducer from '../store/reducers';

// Стили VKUI
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/dist/unstable.css';
import platformApi from "src/js/platformApi";

// Главный объект стора
export const store = createStore(rootReducer, applyMiddleware(thunk));

// Use scroll helper
const root = document.getElementById('root');
mVKMiniAppsScrollHelper(root);

if (document.location.href) {
  axios.defaults.headers.common.user = document.location.href;
}

axios.defaults.baseURL = config.apiUrl;
axios.defaults.responseType = 'json';

if (platformApi.currentType() === 'vk') {
  // Change scheme
  bridge.send(
    'VKWebAppSetViewSettings',
    {
      'status_bar_style': 'dark',
      'action_bar_color': '#F8FCFE'
    }
  );

  // Init VK Mini App
  bridge.send('VKWebAppInit');
}

let el = document.createElement('div');
document.body.appendChild(el);

if (process.env.localConfig === 'production') {
  eruda.init({
    container: el
  });
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  root
);
