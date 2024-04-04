const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req, res, cb){
        cb(null, "public/uploads");
    },
    filename : function(req, profile, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9 );
        const filename = profile.originalname.split(".")[0];
        cb(null, filename + "-" + uniqueSuffix + ".png");
    },
})
exports.upload = multer({storage : storage});




