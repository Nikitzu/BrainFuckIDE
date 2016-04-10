var File = require('../models/file').File;

exports.post = function(req, res, next) {
    console.log('DELETE-POST REQ', res.locals.user.username, req.body.fileName, req.body.fileText);
    File.deleteFile(res.locals.user.username, req.body.fileName, function(records){
        if (records == "No Link"){
            res.status(404).send("Fuck off!");
        }
    });
};