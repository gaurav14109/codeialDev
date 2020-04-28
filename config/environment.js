//creating production and develpment environment
const fs = require('fs')//file system
const rf = require('rotating-file-stream');
const path = require('path');//pathh libraray
const logDirectory = path.join(__dirname,'../production_logs')//going to production logs
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);//check if log_directory exists otherwise create file or folder

const accessLogStream = rf.createStream('access.log',{//creating access.log file 
    interval:'1d',//duration
    path:logDirectory//directory
});

const development = {

    name:'development',
    assest_path:'./assets',
    session_cookie_key:'codeial',
    db_name:process.env.DB_NAME,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'gauravgusain48',
            pass:'deveshwari141097'
        }
    },
    google_client_ID: "313233209747-dnqmail3j800a2jvsuckqhohodhs7i63.apps.googleusercontent.com",
    google_client_Secret: "0FXb5EBWa4xRfJ8jR-1HKMd2",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgon:{
        name:'dev',
        options:{stream: accessLogStream}
    }//defining  the morgon
}
//produvction level will be stored in a file so that new developer does not have access to the production environment.using bash
const production = {
    name:'production',
    assest_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.SESSION_COOKIE_KEY,
    db_name:process.env.DB_NAME,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.GOOGLE_EMAIL,
            pass:process.env.GOOGLE_PWD
        }
    },
    google_client_ID:process.env.GOOGLE_CLIENT_ID,
    google_client_Secret:process.env.GOOGLE_CLIENT_SECRET,
    google_callback_URL:process.env.GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.JWT_SECRET,
    morgon:{
        name:'combine',
        options:{stream: accessLogStream}
    }

}



//eval("2+2")=4 string value to expression
 module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
//ternary
