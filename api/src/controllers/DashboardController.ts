import { Request, Response } from 'express';
import DashboardService from '../services/DashboardService';

export default class DashboardController {
    static async listDashEnergyConsumed(request: Request, response: Response) {
        try {
            let idCustomer: number = 0

            if (request.params.id) {
                idCustomer = parseInt(request.params.id)
            }

            const dash = await DashboardService.listDashEnergyConsumed(idCustomer);

            response.status(200).json({ dash: dash });
        } catch (error) {
            console.error('Error list dashboard:', error);
            response.status(500).json({ error: 'Error list dashboard' });
        }
    }

    static async listDashEnergyEconomy(request: Request, response: Response) {
        try {
            let idCustomer: number = 0

            if (request.params.id) {
                idCustomer = parseInt(request.params.id)
            }

            const dash = await DashboardService.listDashEnergyEconomy(idCustomer);
            response.status(200).json({ dash: dash });
        } catch (error) {
            console.error('Error list dashboard:', error);
            response.status(500).json({ error: 'Error list dashboard' });
        }
    }
}
