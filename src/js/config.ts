export let config;

if (process.env.NODE_ENV === 'production') {
  config = {
    wsUrl: 'wss://vaccine-wss.skyreglis.studio',
    apiUrl: 'https://vaccine.skyreglis.studio'
  };
} else {
  config = {
    wsUrl: 'ws://localhost:3245',
    apiUrl: 'http://127.0.0.1:3244/api/rest'
  };
}
