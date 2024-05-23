import Customer from "../database/models/Customer";
import { PdfExtractData } from "../interfaces/PdfExtractData";

export default class CustomerRepository {
    static async findOrCreateCustomerNumber(extractedData: PdfExtractData) {
        const [customer] = await Customer.findOrCreate({
            where: {
                customerNumber: extractedData.customerNumber
            }
        });
        return customer.id;
    }

    static async listAll() {
        return await Customer.findAll();
    }
}
