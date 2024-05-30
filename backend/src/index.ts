import 'dotenv/config'
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router'
const app =express();

// const PORT=process.env.PORT || 8080;

app.use(cors({
    credentials:true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/',router());

const server =http.createServer(app)

server.listen(8080,()=>{
 console.log("server running on http://localhost:8080")
})
