import { FilesUploaded } from "../interfaces/FilesUploaded";
import { extractTextFromPdf } from "./pdfService";

export default class InvoiceService {
    static async processPdfInvoice(filesUploaded: FilesUploaded[]) {
        for (const file of filesUploaded) {
            let extractedData = await extractTextFromPdf(file.path, file.filename)
            console.log(extractedData);
        }
    }
}
