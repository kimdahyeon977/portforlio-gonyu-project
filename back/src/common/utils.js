var util= {};
util.noPermission= function(requester,owner){
    if(requester.userId==owner || requester.role==='admin'){
        return
    }
}
export {util};

