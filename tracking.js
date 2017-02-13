const axios = require('axios');

const DOMAIN = 'http://localhost:3000/';

const track = () => {
  return axios.get(`${DOMAIN}tracking`)
    .then((res) => {
      console.log('Read cookies', res.headers['set-cookie']);
      return res.headers['set-cookie'];
    });
};

const convert = (cookies) => {
  console.log('cookies', cookies);
};

track()
.then(convert);
