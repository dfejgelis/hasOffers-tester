const api = require('./lib/api');
const debug = require('./lib/debug');

const DOMAIN = 'http://localhost:3000/';

const track = () => {
  // const url = `${DOMAIN}tracking`;
  const url = 'https://ipsyresearch.go2cloud.org/aff_c?aff_id=1&url=http%3A%2F%2Fwww.bumbleandbumble.com%2F%3Fcm_mmc%3Dipsy-shopper-_-null-_-null-_-null&offer_ref=bumble';
  return api.get(url)
    .then((res) => {
      console.log('Read cookies', JSON.stringify(res.headers['set-cookie'], null, 2));
      return res.headers['set-cookie'];
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const convert = (cookies) => {
  const url = `${DOMAIN}convert`;
  // const url = 'https://ipsyresearch.go2cloud.org/aff_l?aff_id=1&adv_sub3=20&adv_sub2=5&amount=15&adv_sub5=USD&offer_ref=bumble&adv_sub=2670118345&undefined=1486068970286';
  // const url = 'https://ipsyresearch.go2cloud.org/aff_l?aff_id=1&adv_sub3=20&adv_sub2=5&amount=15&adv_sub5=USD&offer_ref=shopper-debug&adv_sub=2670118345&undefined=1486068970286';
  // const url = 'https://ipsyresearch.go2cloud.org/aff_l?offer_id=89&amount=9';
  // console.log('cookies', JSON.stringify(cookies, null, 2));
  const cookiesCleaned = cookies
    .map((cookie) => {
      return cookie.split(';')[0];
    })
    .join(';')
    ;
  console.log('cookies', JSON.stringify(cookiesCleaned, null, 2));
  return api.get(url, {
    headers: {
      Cookie: cookiesCleaned,
    },
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
};

const cookies = [
  "enc_aff_session_47=ENC02534-102cde83f00addf8f201cda82d3442-1-47-0-0-0-0-AR-0-_-_-_-_-_-_-200.123.128.225-20170213182943-_-640A5E0B386D0E07346039454F0F510A4B450B081C1B574B3734100B5329551D5A2C04277D245A2223; expires=Mon, 13 Mar 2017 23:29:43 GMT; path=/;",
  "ho_mob=eyJtb2JpbGVfY2FycmllciI6Ij8iLCJ1c2VyX2FnZW50IjoiQXhpb3MvMC4xNS4zIiwiY29ubmVjdGlvbl9zcGVlZCI6ImJyb2FkYmFuZCJ9; expires=Thu, 09 Jan 2020 10:09:43 GMT; path=/;"
];

// convert(cookies);

track()
  .then(convert);
