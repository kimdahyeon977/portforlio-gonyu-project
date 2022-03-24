class Utils{
    editPermission(reqid,resid){
        if (reqid !== resid) throw new Error("사용자 ID가 다릅니다")
    }
}
export {Utils}