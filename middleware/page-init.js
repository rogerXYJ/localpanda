export default function (context) {
    let apiBasePath = 'https://api.localpanda.com/api/';
    if(context.isDev){
        //apiBasePath = 'https://api.localpanda.com/api/'
        apiBasePath='http://18.222.2.217/api/'
    }
    context.apiBasePath = apiBasePath;
}