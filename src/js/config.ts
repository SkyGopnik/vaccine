export let config;

if (process.env.localConfig === 'production') {
  config = {
    appId: 7999835,
    wsUrl: 'wss://vaccine-wss.skyreglis.studio',
    apiUrl: 'https://vaccine-api.skyreglis.studio'
  };
} else if (process.env.localConfig === 'test') {
  config = {
    appId: 7888384,
    wsUrl: 'wss://vaccine-test-wss.skyreglis.studio',
    apiUrl: 'https://skyreglis.studio/vaccine_test/api/rest'
  };
} else {
  config = {
    appId: 7704696,
    wsUrl: 'ws://localhost:3245',
    apiUrl: 'http://127.0.0.1:3244'
  };
}

config = {
  ...config,
  appUrl: 'https://vk.com/app7704696',
  chatUrl: 'https://vk.me/join/AJQ1d/E8nBabv9DfXT9Pmnhs',
  messageGroupUrl: 'https://vk.me/skyreglis'
};
