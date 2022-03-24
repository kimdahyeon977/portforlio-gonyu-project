import jwt from "jsonwebtoken";
const secret='elice';
var util= {};
util.noPermission= function(owner,requester){
    if(owner.userId!=requester.id  ){
        if(requester.role =='admin'){
            return
        }
        throw new Error('no Permission!')
    }
}
util.adminshow= function(requester){ //관리자만 볼수 있는 모든 유저의 플젝정보보기
    if(requester.role != 'admin'){ 
        throw new Error("no Permission!")
    }
}
util.setUserToken=(res,user)=>{
    const token=jwt.sign(user,secret);
    res.cookie('token',token)
}
export {util};

