var File = require('../models/file').File;

exports.post = function(req, res, next){
    console.log(res.locals.user.username, req.body.fileName, req.body.fileText);
    File.addFile(res.locals.user.username,req.body.fileName, req.body.fileText, function(){
        res.send("OK");
    });
};


exports.get = function(req, res, next) {
    File.allUsersFiles(res.locals.user.username,function(records){
        if (records == "No Link"){
            res.status(404).send("Fuck off!");
        }
        else{
            res.send({files: records});
        }
    });
};