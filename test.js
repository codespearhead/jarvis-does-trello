var axios = require('axios');

var config = {
  method: 'put',
  url: 'https://api.trello.com/1/cards/621e7d1ef9b99e634a6a5853?token=460aaffa7b5ce6f4a55f2013757344d41b298d07f983a4f07780883c07326492&key=d26712c485803da0e1e95dd74515d9a0',
  headers: { 
    'Content-Type': 'application/json'
  },
  data: JSON.stringify({
    "desc": "B2"
  })
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
