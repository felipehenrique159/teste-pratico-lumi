import express, { Request, Response } from 'express'
const routes = express.Router()
import InvoiceController from './controllers/InvoiceController';
import { uploadPdfs } from './services/MulterService';
import CustomerController from './controllers/CustomerController';
import PdfController from './controllers/PdfController';
import DashboardController from './controllers/DashboardController';

routes.post('/process-pdf', uploadPdfs.array('files'), async (request: Request, response: Response) => {
  if (!request.files || !Array.isArray(request.files)) {
    return response.status(400).send('No files uploaded.');
  }
  return await InvoiceController.processPdfInvoice(request.files, response);
});

routes.get('/list-all-invoices', async (request: Request, response: Response) => {
  return await InvoiceController.listAllInvoices(response);
});

routes.get('/list-all-customers', async (request: Request, response: Response) => {
  return await CustomerController.listAllCustomers(response);
});

routes.get('/download/path', async (request: Request, response: Response) => {
  return await PdfController.downloadPdf(request, response);
});

routes.get('/list-dash-energy-consumed/:id?', async (request: Request, response: Response) => {
  return await DashboardController.listDashEnergyConsumed(request, response);
});

routes.get('/list-dash-energy-economy/:id?', async (request: Request, response: Response) => {
  return await DashboardController.listDashEnergyEconomy(request, response);
});



export default routes
