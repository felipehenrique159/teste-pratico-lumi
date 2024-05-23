import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaHome } from "react-icons/fa";
import { useEffect, useState } from 'react';
import api from '../services/api';
import Invoice from '../interfaces/Invoice';
import CustomerInvoice from '../interfaces/InvoiceCustomer';

export default function InvoiceLibrary() {

  const [customers, setCustomers] = useState([])
  const [invoices, setInvoices] = useState([])
  const [invoicesFiltered, setInvoicesFiltered] = useState([])

  useEffect(() => {
    listAllCustomers()
    listAllInvoices();
  }, []);

  const listAllCustomers = async () => {
    try {
      const response = await api.get('list-all-customers');
      setCustomers(response.data.customers)
    } catch (error) {
      console.error('Erro ao listar faturas:', error);
    }
  };

  const listAllInvoices = async () => {
    try {
      const response = await api.get('list-all-invoices');
      setInvoices(response.data.invoices)
      setInvoicesFiltered(response.data.invoices)
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
    }
  };

  const filterForCustomer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = event.target.value;

    if (customerId === '') {
      setInvoicesFiltered(invoices)
      return
    }

    let newListInvoices = invoices.filter((invoice: Invoice) => {
      return invoice.customerInvoice.id === parseInt(customerId)
    })

    setInvoicesFiltered(newListInvoices)
  };

  return (
    <div className='mb-5'>
      <Row>
        <Col md={6}>
          <Link to="/">
            <Button variant="primary" className='my-5'>Inicio <FaHome /></Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <label>Numero de cliente:</label>
          <Form.Select aria-label="Default select example" className='my-2' onChange={filterForCustomer}>
            <option value="">-- Selecione --</option>
            {customers.map((customer: CustomerInvoice) => (
              <option key={customer.id} value={customer.id}>{customer.customerNumber}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row className='my-5'>
        <Col md={12}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Table striped bordered hover>
              <thead style={{ position: 'sticky', top: '0px', margin: '0 0 0 0' }}>
                <tr>
                  <th>Cliente</th>
                  <th>Arquivo</th>
                  <th>Mês referencia</th>
                  <th>Download Fatura</th>
                </tr>
              </thead>
              <tbody>
                {invoicesFiltered.map((invoice: Invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.customerInvoice.customerNumber}</td>
                    <td>{invoice.filename}</td>
                    <td>{invoice.month_reference}</td>
                    <td>
                      <a href={invoice.path}>
                        <FaFilePdf />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {
            invoicesFiltered.length === 0 && (
              <h5 className='text-center'>Sem faturas disponíveis</h5>
            )
          }
        </Col>
      </Row>
    </div>
  )
}
