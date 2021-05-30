export let config;

if (process.env.localConfig === 'production') {
  config = {
    wsUrl: 'wss://vaccine-wss.skyreglis.studio',
    apiUrl: 'https://skyreglis.studio/vaccine/api/rest'
  };
} else {
  config = {
    wsUrl: 'ws://localhost:3245',
    apiUrl: 'http://127.0.0.1:3244/vaccine/api/rest'
  };
}

config = {
  ...config,
  appUrl: 'https://vk.com/app7704696',
  chatUrl: 'https://vk.me/join/AJQ1d/E8nBabv9DfXT9Pmnhs',
  messageGroupUrl: 'https://vk.me/skreglis'
};
