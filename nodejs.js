import axios from "https://cdn.skypack.dev/axios@1.3.4";
import qs from "https://cdn.skypack.dev/qs@6.11.1";
var data = qs.stringify({
    'code': `npm install require-from-url
  `,
    'language': 'js',
    'input': '7'
});
var config = {
    method: 'post',
    url: 'https://api.codex.jaagrav.in',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  }); 
