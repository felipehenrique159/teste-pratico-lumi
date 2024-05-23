import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaHome } from "react-icons/fa";

export default function InvoiceLibrary() {
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
          <Form.Select aria-label="Default select example" className='my-2'>
            <option>-- Selecione --</option>
            <option value="1">7005400387</option>
            <option value="2">7005400387</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className='my-5'>
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Numero Cliente</th>
                <th>Donwload Fatura</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7005400387</td>
                <td> <FaFilePdf /></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      
    </div>
  )
}
