const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(cors({origin: "*"}));
app.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
      }
    })
     
    var upload = multer({ storage: storage })

app.get("/",(req,res)=>{
    res.send(`Request Received`)
});

app.post("/file",upload.single('file'),(req,res,next) => {
   const file =req.file;
   console.log(file.filename);
   if(!file){
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
   }
   res.send(file)
});

app.post("/multipleFiles",upload.array('files'),(req,res,next) => {
    const files =req.files;
    console.log(files);
    if(!files){
     const error = new Error('No File')
     error.httpStatusCode = 400
     return next(error)
    }
    res.send({ status : 'ok'})
 });
 







app.listen(8000,()=> {
    console.log("server is listening on port 8000")
});