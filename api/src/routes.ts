import express, { Request, Response } from 'express'
const routes = express.Router()
import InvoiceController from './controllers/InvoiceController';
import { uploadPdfs } from './services/MulterService';

routes.post('/process-pdf', uploadPdfs.array('files'), async (request: Request, response: Response) => {
  if (!request.files || !Array.isArray(request.files)) {
    return response.status(400).send('No files uploaded.');
  }
  return await InvoiceController.processPdfInvoice(request.files, response);
});

export default routes
