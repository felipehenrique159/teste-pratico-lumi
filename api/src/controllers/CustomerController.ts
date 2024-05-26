import { Response } from 'express';
import CustomerService from '../services/CustomerService';

export default class CustomerController {
    static async listAllCustomers(response: Response) {
        try {
            const customers = await CustomerService.listAllCustomers();
            response.status(200).json({ customers: customers });
        } catch (error) {
            console.error('Error list customers:', error);
            response.status(500).json({ error: 'Error list customers' });
        }
    }
}
