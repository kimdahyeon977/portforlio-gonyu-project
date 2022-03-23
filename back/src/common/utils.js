var util= {};
util.noPermission= function(requester,owner){
    if(requester!==owner){
        throw new Error("No Permission!")
    }
}
export {util};

