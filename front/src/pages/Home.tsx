import UploadPDF from '../components/UploadPdf';
import ChartKwhBar from '../components/ChartKwhBar';
import { Col, Container, Row } from 'react-bootstrap';
import ChartInvoiceBar from '../components/ChartInvoiceBar';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <>
    <NavBar />
    <div className='d-flex flex-column justify-content-center' style={{height: '80vh'}}>
      <Container className='d-flex justify-content-center flex-column'>
        <Row>
          <Col md={6}>
            <ChartKwhBar />
          </Col>

          <Col md={6}>
            <ChartInvoiceBar />
          </Col>
        </Row>
      </Container>

      <UploadPDF />
    </div>
    </>
  );
}
