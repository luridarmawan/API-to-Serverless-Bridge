import config from 'dotenv';

const Config = {
  buildDate: '%buildDate%',
  environment: 'development',
  system: {
    name: 'Your System Name',
    description: 'Your Description'
  },
  development: {
    system: {
      name: 'Your System Name',
      apiBaseURL: 'https://api.carik.id'
    },
    socket: {
      enable: false
    },
    facebook: {
      appId: 'your_facebook_appid',
      pixId: 'your_facebook_pixid'
    },
    google: {
      gaId: 'your_google_gaid',
      gtmId: 'your_google_gtmid',
      gadId: 'your_google_gadid'
    }
  }
};

export default Config;
