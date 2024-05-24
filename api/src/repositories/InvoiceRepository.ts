import Invoice from "../database/models/Invoice";
import { PdfExtractData } from "../interfaces/PdfExtractData";

export default class InvoiceRepository {
    static async create(idCustomer: number, extractedData: PdfExtractData) {
        await Invoice.create({
            filename: extractedData.filename,
            path: 'invoices/' + extractedData.filename,
            instalation_number: extractedData.instalationNumber,
            month_reference: extractedData.monthReference,
            month_digit_reference: extractedData.monthDigitReference,
            electric_energy_quant: extractedData.electricEnergy ? extractedData.electricEnergy.quant : 0,
            electric_energy_united_value: extractedData.electricEnergy ? extractedData.electricEnergy.unitedValue : 0,
            electric_energy_value: extractedData.electricEnergy ? extractedData.electricEnergy.value : 0,
            energy_scee_icms_quant: extractedData.energySceeIcms ? extractedData.energySceeIcms.quant : 0,
            energy_scee_icms_united_value: extractedData.energySceeIcms ? extractedData.energySceeIcms.unitedValue : 0,
            energy_scee_icms_value: extractedData.energySceeIcms ? extractedData.energySceeIcms.value : 0,
            compensated_energy_gd_quant: extractedData.compensatedEnergyGd ? extractedData.compensatedEnergyGd.quant : 0,
            compensated_energy_gd_united_value: extractedData.compensatedEnergyGd ? extractedData.compensatedEnergyGd.unitedValue : 0,
            compensated_energy_gd_value: extractedData.compensatedEnergyGd ? extractedData.compensatedEnergyGd.value : 0,
            public_lighting_value: extractedData.publicLighting,
            id_customer: idCustomer
        });
    }

    static async listAll() {
        return await Invoice.findAll({
            include: 'customerInvoice'
        })
    }
}