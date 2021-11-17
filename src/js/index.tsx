import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

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

axios.defaults.baseURL = queryGet('odr_enabled') === "1" ? config.apiUrl.replace("https", "vkcors") : config.apiUrl;
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

Sentry.init({
  dsn: "https://27a11231e78d42c081e57b4697453cb1@o1071656.ingest.sentry.io/6069191",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  root
);
