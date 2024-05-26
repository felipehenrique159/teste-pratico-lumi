import { Col, Form, Row } from 'react-bootstrap';
import CustomerInvoice from '../interfaces/InvoiceCustomer';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

export default function SelectCustomerDashboardFilter() {
    const { idCustomer, setIdCustomer, setReloadDashConsumed, setReloadDashEnergyTotalValue, listAllCustomers, reloadCustomers } = useContext<any>(DataContext)
    const [customers, setCustomers] = useState<CustomerInvoice[]>([]);

    const filterForCustomer = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const customerId = event.target.value;
        setIdCustomer(customerId)
        setReloadDashConsumed([])
        setReloadDashEnergyTotalValue([])
    };

    const loadData = async () => {
        const response = await listAllCustomers()
        if (response) {
            setCustomers(response.data.customers)
        }
    }

    useEffect(() => {
        loadData()
    }, [reloadCustomers]);

    return (
        <Row className='my-5'>
            <Col md={6}>
                <label>Numero de cliente:</label>
                <Form.Select aria-label="Default select example" className='my-2' onChange={filterForCustomer}>
                    <option value="">-- Selecione --</option>
                    {customers.map((customer: CustomerInvoice) => (
                        <option key={customer.id} value={customer.id} selected={idCustomer == customer.id}>{customer.customerNumber}</option>
                    ))}
                </Form.Select>
            </Col>
        </Row>
    );
}
