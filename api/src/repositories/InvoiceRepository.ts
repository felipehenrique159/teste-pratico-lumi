import Invoice from "../database/models/Invoice";

export default class InvoiceRepository {
    static async create(idCustomer: number, extractedData: any) {
        await Invoice.create({
            filename: extractedData.filename,
            path: 'invoices/' + extractedData.filename,
            instalation_number: extractedData.instalationNumber,
            month_reference: extractedData.monthReference,
            electric_energy_quant: extractedData.electricEnergy.quant,
            electric_energy_united_value: extractedData.electricEnergy.unitedValue,
            electric_energy_value: extractedData.electricEnergy.value,
            energy_scee_icms_quant: extractedData.energySceeIcms ? extractedData.energySceeIcms.quant : null,
            energy_scee_icms_united_value: extractedData.energySceeIcms ? extractedData.energySceeIcms.unitedValue : null,
            energy_scee_icms_value: extractedData.energySceeIcms ? extractedData.energySceeIcms.value : null,
            compensated_energy_gd_quant: extractedData.compensatedEnergyGd ? extractedData.compensatedEnergyGd.quant : null,
            compensated_energy_gd_united_value: extractedData.compensatedEnergyGd ? extractedData.compensatedEnergyGd.unitedValue : null,
            compensated_energy_gd_value: extractedData.compensatedEnergyGd ? extractedData.compensatedEnergyGd.value : null,
            public_lighting_value: extractedData.publicLighting,
            id_customer: idCustomer
        });
    }

}