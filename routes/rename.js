var File = require('../models/file').File;

exports.post = function(req, res, next){
    File.renameFile(res.locals.user.username,req.body.new, req.body.old, function(answer) {
        console.log(answer);
        if (answer == "error"){
            res.status(400).send("File already exists!");
        } else {
            res.status(200).send("OK");
        }
    });
};
