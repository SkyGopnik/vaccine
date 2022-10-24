export let config;

if (process.env.localConfig === 'production') {
  config = {
    appId: 51457526,
    wsUrl: 'wss://vaccine-wss.skyreglis.studio',
    apiUrl: 'https://vaccine-api.skyreglis.studio',
    appUrl: 'https://vk.com/app7999835'
  };
} else if (process.env.localConfig === 'development') {
  config = {
    appId: 51457526,
    wsUrl: 'wss://vaccine-development-wss.skyreglis.studio',
    apiUrl: 'https://vaccine-development-api.skyreglis.studio',
    appUrl: 'https://vk.com/app8006453'
  };
} else if (process.env.localConfig === 'local') {
  config = {
    appId: 51457526,
    wsUrl: 'ws://localhost:3245',
    apiUrl: 'http://127.0.0.1:3244'
  };
}

config = {
  ...config,
  chatUrl: 'https://vk.me/join/AJQ1d/E8nBabv9DfXT9Pmnhs',
  messageGroupUrl: 'https://vk.me/skyreglis',
  faqUrl: 'https://vk.com/@skyreglis-vaccine-faq',
  addCommunity: 'https://vk.com/add_community_app.php?aid=' + config.appId
};
