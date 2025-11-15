
function ThrowError(msg){
    var isDebug = false;
    if(isDebug){
        throw new Error(msg);
    } else{
        console.error(msg);
        process.exit(-1);
    }
}

module.exports = ThrowError 