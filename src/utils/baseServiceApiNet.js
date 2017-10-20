const baseURL = "https://raw.githubusercontent.com/ColinXXT/Test/master/";
function fetchAction(...props) {
  this.url = props.shift(1);
  this.options = props.shift(1);
  console.info(Object.assign({}, this.options));
  return fetch(this.url, Object.assign({}, this.options))
  .then((response) => response.json())
}
export default {
  getUserInfo() {
    var apiPort = "userInfo.json";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  },
  sentPublicVote(formData) {
    var apiPort = "publicVote.json";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token':''
      },
      body:formData
    });
  },
  getVoteList() {
    var apiPort = "getVoteList.json";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token':''
      }
    });
  },
  submitVote(formData) {
    var apiPort = "submitVote.json";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token':''
      },
      body:formData
    });
  },
};