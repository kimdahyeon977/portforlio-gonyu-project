var util= {};

util.editPermission=function(reqid,resid){
    if (reqid !== resid) {
        throw new Error("사용자 ID가 다릅니다")}
}
util.noPermission= function(owner,requester){
    if(owner.userId!=requester.id  ){
        if(requester.role =='admin'){
            return
        }
        throw new Error('no Permission!')
    }
}
util.adminShow= function(requester){ //관리자만 볼수 있는 모든 유저의 플젝정보보기
    if(requester.role != 'admin'){ 
        throw new Error("no Permission!")
    }
}
util.isRecruter = function (requester) {
    if (requester.role !== "recruter") {
      throw new Error("채용관계자만 좋아요를 누를수있습니다!");
    }
  };
export {util};