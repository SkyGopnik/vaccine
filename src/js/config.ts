export let config;

if (process.env.localConfig === 'production') {
  config = {
    appId: 7999835,
    wsUrl: 'wss://vaccine-wss.skyreglis.studio',
    apiUrl: 'https://vaccine-api.skyreglis.studio',
    appUrl: 'https://vk.com/app7999835'
  };
} else if (process.env.localConfig === 'development') {
  config = {
    appId: 7888384,
    wsUrl: 'wss://vaccine-development-wss.skyreglis.studio',
    apiUrl: 'https://vaccine-development-api.skyreglis.studio',
    appUrl: 'https://vk.com/app8006453'
  };
} else if (process.env.localConfig === 'local') {
  config = {
    appId: 7704696,
    wsUrl: 'ws://localhost:3245',
    apiUrl: 'http://127.0.0.1:3244'
  };
}

config = {
  ...config,
  chatUrl: 'https://vk.me/join/AJQ1d/E8nBabv9DfXT9Pmnhs',
  messageGroupUrl: 'https://vk.me/skyreglis'
};
