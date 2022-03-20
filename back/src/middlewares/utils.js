var util= {};
util.noPermission= function(requester,owner){
    if(requester!==owner){
        throw new Error("No Permission!")
    }
}
//자주쓰는 기능생기면 위와 같은 형식으로 추가하세요
export {util};