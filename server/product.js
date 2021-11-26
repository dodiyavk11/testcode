import express from "express";
const router = express.Router();
const fs = require("fs");
const csv = require("fast-csv");


router.post('/add', upload.single("file"), (req, res) => {
    try {
        if (req.file == undefined) {
          return res.status(400).send("Please upload a CSV file!");
        }

        let tutorials = [];
        let path = __basedir + "/uploads/" + req.file.file;

        fs.createReadStream(path)
          .pipe(csv.parse({ headers: true }))
          .on("error", (error) => {
            throw error.message;
          })
          .on("data", (row) => {
            dataList.push(row);
          })
          .on("end", () => {
            console.log(dataList);
          });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Could not upload the file: " + req.file.originalname,
        });
      }
    res.json('ok');
});


router.get('/get', (req, res) => {
    
});


module.exports = router;
