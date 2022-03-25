class utils{
    editPermission(reqid,resid){
        if (reqid !== resid) {
            throw new Error("사용자 ID가 다릅니다")}
    }
    noPermission(owner,requester){
        if(owner.userId!=requester.id  ){
            if(requester.role =='admin'){
                return
            }
            throw new Error('no Permission!')
        }
    }
}

const Utils = new utils()
export {Utils}