const express = require("express"),
    bodyParser = require("body-parser"),
    formidable = require("formidable"),
    cookieParser = require("cookie-parser"),
    config = require("./config/config"),
    fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/upload", function (req, res) {

    let form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if (!files.image.path) {
            return res.statusCode(400).json({
                status: false,
                message: 'Select any image'
            });
        }

        var dir = config.filePath;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        var oldpath = files.image.path;
        var newpath = dir + files.image.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                throw err;
            }
            res.json({
                status: true,
                message: 'File uploaded!'
            });
        });
    });
});

app.listen(config.port, function () {
    console.log("Server started on port " + config.port);
});