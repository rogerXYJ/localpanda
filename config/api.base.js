exports.API_HOST = "http://192.168.88.107/proxy"
var apiConfig = {};

function setParam(reqObj, reqPath, reqSrv) {
	reqSrv === undefined ? reqSrv = 'nns' : reqSrv;
	var str = JSON.stringify(reqObj);
	var reqStr = {
		path: reqPath,
		param: 'reqStr=' + str,
		srv: reqSrv
	}
	console.log(reqStr)
	//	return reqStr;
	return JSON.stringify(reqStr);
}

export { setParam }

function getURL() {
	console.log(process.env.NODE_ENV == "development", 'boolen');
	switch(process.env.NODE_ENV) {
		case "development":
			return '"http://localhost/api/"';
		case "production":
			return '"http://api.xxx.com/"';
		default:
			return '"http://localhost/api/default"';
	}
}