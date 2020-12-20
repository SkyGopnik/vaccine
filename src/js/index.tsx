import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Import scroll helper for safari
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';

// Главный файл
import AppContainer from '../pages/AppContainer';

// Главный reducer
import rootReducer from '../store/reducers';

// Стили VKUI
import '@vkontakte/vkui/dist/vkui.css';
import '@vkontakte/vkui/dist/unstable.css'

// Главный объект стора
const store = createStore(rootReducer, applyMiddleware(thunk));

// Use scroll helper
const root = document.getElementById('root');
mVKMiniAppsScrollHelper(root);

if (document.location.href) {
  axios.defaults.headers.common.user = document.location.href;
}

axios.defaults.baseURL = 'https://bugtracker.skyreglis.studio/api/rest';
axios.defaults.responseType = 'json';

// Init VK Mini App
bridge.send('VKWebAppInit');

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  root
);
