const baseURL = "https://raw.githubusercontent.com/ColinXXT/Test/master/";
function fetchAction(...props) {
  this.url = props.shift(1);
  this.options = props.shift(1);
  console.info(Object.assign({}, this.options));
  return fetch(this.url, Object.assign({}, this.options))
  .then((response) => response.json())
}
export default {
  getUserInfo(formData) {
    var apiPort = "userInfo.json";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(formData)
    });
  },
  sentPublicVote(formData) {
    var apiPort = "publicVote.json";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '需要认证数据',
      },
      body: JSON.stringify(formData)
    });
  },
  getVoteList() {
    var apiPort = "getVoteList.json";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '需要认证数据',
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
        'Authorization': '需要认证数据',
      },
      body: JSON.stringify(formData)
    });
  },
};