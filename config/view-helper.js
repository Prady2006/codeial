const env = require('./environment');
const fs = require('fs');
const path = require('path');
module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if(env.name == 'development'){
            return filePath;
        }
        console.log("log,", '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath]);
        if(filePath.search(".css") != -1){
            return '/css/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath]; 
        }else if (filePath.search(".js") != -1){
            return '/js/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
        }
        // return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }
}