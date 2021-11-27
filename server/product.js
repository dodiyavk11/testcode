import express from "express";
const fileUpload = require('express-fileupload');
const router = express.Router();
const fs = require("fs");
const csv = require("fast-csv");

router.use(fileUpload());


router.post('/getProducts', (req, res) => {

  let dataPath = __dirname + '/data/images.json';
  var fs = require('fs');
  var json;
  fs.readFile(dataPath, 'utf8', function (err, data) {
    if (err) throw err;
    json = JSON.parse(data);
    res.json(json);
  });
});

router.post('/add', async (req, res) => {
    try {
        var fs = require('fs');
        let dataPath = __dirname + '/data/images.json';
        if(!req.files) {
          return res.status(400).send("Please upload a CSV file!");
        }
        var error1 = 0;
        var i = 0;
        let sampleFile = req.files.file;
        var json = await getFiles(sampleFile);
        var data = await getFiles1(sampleFile);

        json = json.olddata;
        data = data.newdata;
        var mydata = [];

        var dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
        dataArray.forEach(function (item) {
          const myArray = item.split(";");

          var id = 'NA';
          if(myArray[0]){
            id = myArray[0].replace('"', '');
          }
          var name = 'NA';
          if(myArray[1]){
            name =myArray[1].replace('"', '');
          }
          var image = 'NA';
          if(myArray[2]){
            image =myArray[2].replace('"', '');
          }
          var width = 2048;
          var height = 1536;
          if(image == 'NA'){
            width = 'NA';
            height = 'NA';
          }

          if(i==0){
            if( id !== 'id"' || name !== 'name"' || image !== 'url"')
            {
              error1 = 1;
            }
          }
          if(i!=0){
            if( id === 'NA' && name === 'NA' && image === 'NA'){

            }else{
              var newarray = {
                id:id.replace('"', ''),
                name:name.replace('"', ''),
                picture:{
                  image:image.replace('"', ''),
                  width:width,
                  height: height
                }
              }
              mydata.push(newarray);
            }
          }
          i = 1;
        });
      var lastdata = json.concat(mydata);
      fs.writeFile(dataPath,JSON.stringify(lastdata),function(err){
        if(err) throw err;
      })

      console.log(error1);
      if(error1 == 0){
        res.json(true);
      }else{
        res.status(200).send({
          data: [],
          error: 'CSV File dose not contain valit columns'
        });
      }


    } catch (error) {
        res.status(500).send({
          message: "Could not upload the file: ",
        });
    }
});

async function getFiles(sampleFile) {
  return new Promise((res, rej) => {
    let dataPath = __dirname + '/data/images.json';
    var fs = require('fs');

    fs.readFile(dataPath, 'utf8', function (err, data) {
      if (err) rej(err);
      res({ olddata: data });
    });
    res({ olddata: [] });
  });
  return olddata;
}

async function getFiles1(sampleFile) {
  return new Promise((res, rej) => {
    let uploadPath = __dirname + '/uploads/import' + sampleFile.name;
    sampleFile.mv(uploadPath);


    var fs = require('fs');

    fs.readFile(uploadPath, 'utf8', function (err, data) {
      if (err) rej(err);
      res({ newdata: data });
    });
  });
  return newdata;
}

module.exports = router;
