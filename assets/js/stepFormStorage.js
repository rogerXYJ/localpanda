let getStorage = function(key){
    let result = {}
    if(window && window.localStorage){
        let localStorage = window.localStorage;
        let itemStr = localStorage.getItem(key);
        result = JSON.parse(itemStr) || {};
    }
    console.log('getStorage.' + key + '.result = ');
    console.log(result);
    return result;
}

let setStorage = function(key,data){
    console.log('setStorage.' + key + '.result = ');
    console.log(data);
    if(window && window.localStorage){
        let localStorage = window.localStorage;
        let itemStr = JSON.stringify(data);
        localStorage.setItem(key, itemStr);
    }
    return this;
}

let addStorage = function(key,newFormData){
    let data = getStorage(key);    
    data = Object.assign(data, newFormData);
    setStorage(key,data)
    return this;
}

let clearStorage = function(key){
    let localStorage = window.localStorage;
    localStorage.removeItem(key);
    return this;
}

export default{
    getStorage,
    setStorage,
    addStorage,
    clearStorage,
 }