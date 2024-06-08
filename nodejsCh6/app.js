const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const indexRouter = require('./routes'); // route 폴더에 있는 index.js (index는 생략 가능)
const userRouter = require('./routes/user'); // route 폴더에 있는 user.js
const nunjucksHomeRouter = require('./routes/nunhome');
const nunjucksUserRouter = require('./routes/nunuser');

dotenv.config(); // .env 파일 내용 적용
const app = express();
app.set('port', process.env.PORT || 3000);

// nunjucks

const nunjucks = require('nunjucks');
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app, 
    watch: true
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/nunHome', nunjucksHomeRouter);
// app.use('/nunUser', nunjucksUserRouter);

app.use(morgan('dev'));

app.use("/", express.static(path.join(__dirname, 'public')));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// cookieParser
app.use(cookieParser(process.env.COOKIE_SECRET)); // 순서 먼저 해주기.

app.get('/cookie_reset', (req, res)=>{
    res.clearCookie('username', 'rnballard', {
        httpOnly:true, secure:true, signed:true
    })
    res.send('cookie를 reset했어요');
});

// multer 이미지 업로드
const multer = require('multer');
const fs = require('fs');
try{
    fs.readdirSync('uploads');
}catch(err){
    fs.mkdirSync('uploads')
}
const upload = multer(
    {
        storage: multer.diskStorage(
            {
                destination(req, file, done){
                    done(null, 'uploads/')
                },
                filename(req, file, done){
                    const ext = path.extname(file.originalname);
                    done(null, path.basename(file.originalname, ext) + Date.now() + ext);
                }
            }
        ),  // 저장할 곳
        limits: {fileSize: 5 * 1024 * 1024}     // 한계 용량 5MB 
    }
);
app.get('/upload', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

app.post('/upload', upload.single('image'), (req,res)=>{
    console.log(req.file, req.body);
    res.send('upload ok!');
});

app.get('/upload2', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart2.html'));
});

app.post('/upload2', upload.array('many'), (req,res)=>{
    console.log(req.files, req.body);
    res.send('upload ok!');
});

app.get('/upload3', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart3.html'));
})

app.post('/upload3', upload.fields([ {name:'image1'}, {name:'image2'}]), (req,res)=>{
    console.log(req.files, req.body);
    res.send('upload ok!');
});

app.get('/upload4', (req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart4.html'));
});

app.post('/upload4', upload.none(), (req,res)=>{
    console.log(req.body);
    res.send('upload ok!');
});

app.get('/cookie_set', (req, res)=>{
    res.cookie('username" , "rnballard', {
        expires: new Date(Date.now() + 30000),
        httpOnly : true, secure : true, signed: true
    });
    res.cookie('nickname" ,"shugaroon');
    res.send('set cookie');
});



//express-session
app.use(
    session(
        {
            resave: false, saveUninitialized: false, 
            secret: process.env.COOKIE_SECRET,
            cookie: {httpOnly:true, secure: false},
            name: 'session-cookie'
        }        
    )
);

app.use( (req, res, next)=>{
    console.log('should reply to all requests')
    next(); // 다음 미들웨어로 제어를 넘겨줌 (/, /html 정상반응)
});

// req: reuqest 요청, res:response 응답
app.get('/', (req, res)=>{
    res.send('Hello, Express');
});

app.get("/html", (req, res)=>{
    //res.send('html page입니다');
    res.sendFile(path.join(__dirname, '/res_html.html'));
});

app.get('/myerror', (req, res, next)=>{
    console.log('일부러 에러 내는 실험');
    next();
}, (req, res)=>{
    throw new Error('error!');
});

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), ()=>{
    console.log('server executed well');
});



