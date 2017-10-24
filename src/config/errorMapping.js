let errorMapping = {
    getMsgAsRepsCode(repsCode){
        switch(repsCode){
            case 'U_0100_001': return '用户名或者密码错误,请重新输入';
            break;
            case 'U_0100_002': return '用户暂时没有权限,请联系管理员';
            break;
            case 'U_0100_003': return '用户名不存在,请联系管理员';
            break;
        }
    }
}
export default errorMapping;