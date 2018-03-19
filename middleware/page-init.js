export default function (context) {
    let apiBasePath = 'https://api.localpanda.com/api/';
    if(context.isDev){
        apiBasePath = 'https://api.localpanda.com/api/'
        //apiBasePath='http://13.59.63.205/api/'
    }
    context.apiBasePath = apiBasePath;
}