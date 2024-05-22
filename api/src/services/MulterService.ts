import multer from 'multer'
import{ Request } from 'express'

const storage = multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, cb) => {
      cb(null, 'invoices/');
    },
    filename: (request: Request, file: Express.Multer.File, cb) => {
      cb(null, `${file.originalname}`);
    },
});

export const uploadPdfs = multer({ storage });
