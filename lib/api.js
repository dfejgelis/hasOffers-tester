const axios = require('axios');

const api = axios.create({
  timeout: 10000,
  maxRedirects: 0,
  validateStatus: (status) => {
    if (status === 302) {
      return true;
    }
    return status >= 200 && status < 300; // default
  },
});

module.exports = api;
