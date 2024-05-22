import { Response } from 'express';
import InvoiceService from '../services/InvoiceService';
import { FilesUploaded } from '../interfaces/FilesUploaded';

export default class InvoiceController {
    static async processPdfInvoice(filesUploaded: FilesUploaded[], response: Response) {
        try {
            await InvoiceService.processPdfInvoice(filesUploaded)
            response.status(201).json({ message: 'dados do pdf processado com sucesso!' });
        } catch (error) {
            console.error('Erro ao processar pdf:', error);
            response.status(500).json({ error: 'Erro ao processar pdf' });
        }
    }
}
