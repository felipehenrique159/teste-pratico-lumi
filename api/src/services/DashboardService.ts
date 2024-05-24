import InvoiceRepository from "../repositories/InvoiceRepository";

export default class DashboardService {
    static async listDashEnergyConsumed() {
        return InvoiceRepository.listDashEnergyConsumed()
    }

    static async listDashEnergyEconomy() {
        return InvoiceRepository.listDashEnergyEconomy()
    }
}
