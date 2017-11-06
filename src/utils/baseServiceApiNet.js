import {
  AppRegistry,
  AsyncStorage
} from 'react-native';
import errorMapping from '../config/errorMapping';
const baseUserURL = "http://localhost:3000";
const baseVoteURL = "http://localhost:3001";
const _token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuSWQiOiI0ZGI1Y2ExNS0xZWM4LTQ1ZGEtYjhjMi0wYTY4NGM5NzI1NjciLCJzdGFmZklkIjoidXNlciIsImlhdCI6MTUwOTUyNDAwNn0.7jxFXDqY0wCXgvrLREn928AIQgqrmEG0G_HadbZVq1s";

function checkRequestStatus(response){
  //监听请求延迟
  return response;
}
function checkResponsStatus(response){
  console.info(response)
  if(response.hasOwnProperty('errorCode')){
    return {'error':errorMapping.getMsgAsRepsCode(response.errorCode)}
  }else if(response.hasOwnProperty('errorMsg')){
    return {'error':response.errorMsg};
  }else if(response.hasOwnProperty('_token')){
    try {
      AsyncStorage.setItem(
          '_token',
          response._token,
          (error)=>{
              if (error){
                  alert('存值失败:',error);
              }else{
                  alert('存值成功!');
              }
          }
      );
  } catch (error){
      alert('失败'+error);
  }
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
        'Content-Type': 'application/json',
        'Authorization':_token
      },
     body: JSON.stringify(formData)
    });
  },
  sentPublicVote(formData) {
    var apiPort = `votes/${formData.voteId}`;
    return fetchAction(`${baseVoteURL}/${apiPort}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':_token
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
        'Authorization':_token
      }
    });
  },
  getVoteListDetails(voteId) {
    //populate=items&voter=true
    var apiPort = `votes/${voteId}`;
    return fetchAction(`${baseVoteURL}/${apiPort}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':_token
      }
    });
  },
  submitVote(formData) {
    var apiPort = `votes/${formData.voteId}`;
    return fetchAction(`${baseVoteURL}/${apiPort}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':_token
      },
      body: JSON.stringify(formData)
    });
  },
};