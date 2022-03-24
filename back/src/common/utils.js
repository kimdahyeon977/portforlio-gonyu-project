var util= {};
util.noPermission= function(requester,owner){
    if(requester.userId==owner || requester.role==='admin'){//실행잘됨
        return
    }
}
util.adminshow= function(requester){
    if(requester.role != 'admin'){ //currentUserId읽어오지못함
        throw new Error("no Permission!")
    }
}
util.isvalid= function(data){
    if(data != null && typeof data === 'Date'){
        return data
    }
}
export {util};

