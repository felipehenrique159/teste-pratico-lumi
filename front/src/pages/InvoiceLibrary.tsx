import { Button, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaHome } from "react-icons/fa";
import { useEffect, useState } from 'react';
import api from '../services/api';
import Invoice from '../interfaces/Invoice';
import CustomerInvoice from '../interfaces/InvoiceCustomer';
import { toast } from 'react-toastify';

export default function InvoiceLibrary() {

  const [customers, setCustomers] = useState<CustomerInvoice[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesFiltered, setInvoicesFiltered] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    listAllCustomers()
    listAllInvoices();
  }, []);

  const listAllCustomers = async () => {
    try {
      const response = await api.get('list-all-customers');
      setCustomers(response.data.customers)
    } catch (error) {
      toast.error("Erro ao listar clientes");
      console.error('Erro ao listar clientes:', error);
    }
  };

  const listAllInvoices = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('list-all-invoices');
      setInvoices(response.data.invoices)
      setInvoicesFiltered(response.data.invoices)
    } catch (error) {
      toast.error("Erro ao listar faturas");
      console.error('Erro ao listar faturas:', error);
    } finally {
      setIsLoading(false)
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

  const handleDownload = async (invoicePath: string) => {
    try {

      toast.info("Download...");

      const response = await api.get(`/download/path?file=${invoicePath}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', invoicePath.split('/').pop() || 'invoice.pdf');
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      toast.error("Erro ao realizar download da fatura");
      console.error('Erro ao realizar download da fatura:', error);
    }

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
                      <Button variant="link" onClick={() => handleDownload(invoice.path)}>
                        <FaFilePdf />
                      </Button>
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

          {
            invoicesFiltered.length > 0 && (
              <h5 className='my-4'>Exibindo {invoicesFiltered.length} fatura's</h5>
            )
          }

          {isLoading && (
            <Container className='d-flex align-items-center flex-column my-2'>
              <Spinner animation="border" role="status" className='aling-items'>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Container>

          )}
        </Col>
      </Row>
    </div>
  )
}
