//it will store css path  in the locals so that it can used in views 
//global export
const env = require('./environment');
const fs = require('fs')
const path = require('path')
module.exports = (app)=>{
    //asssinging it to be used with views calling assetpath in view
    app.locals.assetPath = function(filePath){

        if(env.name == 'development'){
            return path
        }

        //add  / as the key will return a css file with / after return
        //  /css/layout_12344.css. this will be read read by server and return to browsr.
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,"../public/assets/rev-manifest.json")))[filePath]

        //fs.readFileSync(path.join(__dirname,"../public/assets/rev-manifest.json")))[filePath] path will be single
        //what we have done is take the json file with the help of key we will access the css and js file key is passed in the [filepath] filepath is the key.
        //and then convertiing it into javascript object.
    }

}