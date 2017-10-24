import errorMapping from '../config/errorMapping';
let responseStatus = {
    getRspStatus(response){
      var repsCode = response.body.errorCode;
      var repsStatus = response.status;
      if(Object.is("200",repsStatus)) 
        return 'success';
      else if (Object.is("500",repsStatus)){
        return errorMapping.getMsgAsRepsCode(repsCode);
      }
    }
  }
export default responseStatus