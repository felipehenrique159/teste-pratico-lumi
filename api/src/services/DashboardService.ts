import InvoiceRepository from "../repositories/InvoiceRepository";

export default class DashboardService {
    static async listDashEnergyConsumed(idCustomer: number) {
        return InvoiceRepository.listDashEnergyConsumed(idCustomer)
    }

    static async listDashEnergyEconomy(idCustomer: number) {
        return InvoiceRepository.listDashEnergyEconomy(idCustomer)
    }
}
