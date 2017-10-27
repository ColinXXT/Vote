import errorMapping from '../config/errorMapping';
const baseUserURL = "http://localhost:3000";
const baseVoteURL = "http://localhost:3001";

function checkRequestStatus(response){
  //监听请求延迟
  return response;
}
function checkResponsStatus(response){
  console.info(response)
  if(response.hasOwnProperty('errorCode')){
    return {'error':errorMapping.getMsgAsRepsCode(response.errorCode)}
  }else if(response.hasOwnProperty('_token')){
    _token = response._token;
    return {'success':response};
  }else{
    return {'success':response};
  }
}
function fetchAction(...props) {
  this.url = props.shift(1);
  this.options = props.shift(1);
  console.info(url);
  console.info(Object.assign({}, this.options));
  return fetch(this.url, Object.assign({}, this.options))
  .then(checkRequestStatus)
  .then((response) => response.json())
  .then(checkResponsStatus)
  .then((data)=>data)
}
export default {
  getUserInfo(formData) {
    var apiPort = "authorize";
    console.info(`${baseUserURL}/${apiPort}`);
    return fetchAction(`${baseUserURL}/${apiPort}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(formData)
    });
  },
  sentPublicVote(formData) {
    var apiPort = "publicVote.json";
    return fetchAction(`${baseVoteURL}/${apiPort}`, {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': _token,
      },
      body: JSON.stringify(formData)
    });
  },
  getVoteList() {
    var apiPort = "votes";
    return fetchAction(`${baseVoteURL}/${apiPort}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': _token,
      }
    });
  },
  
  submitVote(formData) {
    var apiPort = "submitVote.json";
    return fetchAction(`${baseVoteURL}/${apiPort}`, {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': _token,
      },
      body: JSON.stringify(formData)
    });
  },
};