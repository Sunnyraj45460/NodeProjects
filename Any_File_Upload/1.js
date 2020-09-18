const express = require('express')
const path=require("path")
const multer = require('multer');
const app = express()

app.use(express.json())
app.use(express.static('Any_File_Upload/public'));
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.set('views', 'Any_File_Upload/views');

const storage = multer.diskStorage({
    destination: 'Any_File_Upload/public/storage',
    filename(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
    // limits:{fileSize: 1000000},
    // fileFilter(req, file, cb){
    //   checkFileType(file, cb);
    // }
}).single('file');


app.get('/', (req, res) => res.render('index'));

app.post('/post',(req,res)=>{
    upload(req, res, (err) => {
        res.render('index', {
            file: `storage/${req.file.filename}`
        })
    })
})

app.listen(3000)