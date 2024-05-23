import { FilesUploaded } from "../interfaces/FilesUploaded";
import { extractTextFromPdf } from "./pdfService";
import CustomerRepository from '../repositories/CustomerRepository'
import InvoiceRepository from "../repositories/InvoiceRepository";

export default class InvoiceService {
    static async processPdfInvoice(filesUploaded: FilesUploaded[]) {
        for (const file of filesUploaded) {
            let extractedData = await extractTextFromPdf(file.path, file.filename);
            if (extractedData) {
                let idCustomer = await CustomerRepository.findOrCreateCustomerNumber(extractedData);
                await InvoiceRepository.create(idCustomer, extractedData);
            }
        }
    }

    static async listAllInvoices() {
        return InvoiceRepository.listAll()
    }
}
