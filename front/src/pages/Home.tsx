import UploadPDF from '../components/UploadPdf';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ChartKwhBar from '../components/ChartKwhBar';
import { Col, Row } from 'react-bootstrap';
import ChartInvoiceBar from '../components/ChartInvoiceBar';
import { FaFilePdf } from "react-icons/fa";

export default function Home() {
 return (
   <div className='mb-5'>
    <Row>
      <Col md={6}>
      <Link to="/invoice-library">
        <Button variant="primary" className='my-5'>
          Biblioteca de faturas <FaFilePdf />
        </Button>
      </Link>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <ChartKwhBar/>
      </Col>

      <Col md={6}>
        <ChartInvoiceBar/>
      </Col>
    </Row>
     <UploadPDF/>
   </div>
  );
}
