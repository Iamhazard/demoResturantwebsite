import multer, { FileFilterCallback } from "multer";
import { Request } from 'express';
import path from 'path';

const stroage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },

    filename:function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: stroage, fileFilter: fileFilter });

const fileSizeFormatter = (bytes: number, decimal: number)=> {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k=1024;
  const dm = decimal < 0 ? 0 : decimal;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
};

export { upload, fileSizeFormatter };