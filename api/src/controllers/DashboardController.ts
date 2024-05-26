import { Response } from 'express';
import DashboardService from '../services/DashboardService';

export default class DashboardController {
    static async listDashEnergyConsumed(response: Response) {
        try {
            const dash = await DashboardService.listDashEnergyConsumed();
            response.status(200).json({ dash: dash });
        } catch (error) {
            console.error('Error list dashboard:', error);
            response.status(500).json({ error: 'Error list dashboard' });
        }
    }

    static async listDashEnergyEconomy(response: Response) {
        try {
            const dash = await DashboardService.listDashEnergyEconomy();
            response.status(200).json({ dash: dash });
        } catch (error) {
            console.error('Error list dashboard:', error);
            response.status(500).json({ error: 'Error list dashboard' });
        }
    }
}
