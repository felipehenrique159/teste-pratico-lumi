import CustomerRepository from '../repositories/CustomerRepository'

export default class CustomerService {
    static async listAllCustomers() {
        return CustomerRepository.listAll()
    }
}
