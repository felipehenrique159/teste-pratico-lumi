import { Request, Response } from 'express';
import PdfService from '../services/pdfService';

export default class PdfController {
    static async downloadPdf(request: Request, response: Response) {
        try {
            response.setHeader('Content-Disposition', `attachment;`);
            response.setHeader('Content-Type', 'application/pdf');
            return await PdfService.downloadPdf(request, response);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    }
}
