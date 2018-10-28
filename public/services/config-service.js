(function(){
    var protocol='http';
    var wcfService='127.0.0.1';
    var wcfPort='8100';
    var sitePort='3000';
    var getAddress=function(){
        return protocol+'://'+wcfService+":"+wcfPort
    };
    if(typeof define==="function"&&define.amd){
        define(function() {
            return{
                getAddress:getAddress,
            }
        });
       
    }else{
        module.exports={
            getAddress:getAddress
        };
    }
    
}())