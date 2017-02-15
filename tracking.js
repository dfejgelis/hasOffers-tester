const api = require('./lib/api');
// const debug = require('./lib/debug');

const DOMAIN = 'http://localhost:3000/';
const affReference = 'shopper-debug';
const affId = 89;


const track = () => {
  console.log('Track', new Date());
  // const url = `${DOMAIN}tracking`;
  const url = `https://ipsyresearch.go2cloud.org/aff_c?aff_id=1&url=http%3A%2F%2Fwww.google.com&offer_ref=${affReference}`;
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
  console.log('Convert', new Date());
  // const url = `${DOMAIN}convert`;
  const url = `https://ipsyresearch.go2cloud.org/aff_l?aff_id=1&adv_sub3=${affId}&adv_sub2=0&amount=29&adv_sub5=USD&offer_ref=${affReference}&adv_sub=2676813644&undefined=1487111845952`;
  // console.log('cookies', JSON.stringify(cookies, null, 2));
  const cookiesCleaned = cookies
    .map(cookie => cookie.split(';')[0])
    .join(';')
    ;
  console.log('cookies', JSON.stringify(cookiesCleaned, null, 2));
  return api.get(url, {
    headers: {
      Cookie: cookiesCleaned,
    },
  })
  .then(() => console.log('-'.repeat(10)))
  .catch((err) => {
    console.error(err);
    throw err;
  });
};

track()
  .then((cookies) => {
    setTimeout(() => convert(cookies), 5000);
  })
;
