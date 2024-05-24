import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import api from '../services/api';
import { toast } from 'react-toastify';
import { DataContext } from '../contexts/DataDashboardContext';

export default function UploadPDF() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { setReloadDashEnergyTotalValue, setReloadDashConsumed } = useContext<any>(DataContext)


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      return;
    }

    const formData = new FormData();

    try {
      toast.info("Processando Pdf's aguarde!");
      setIsloading(true)

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      const response = await api.post('process-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 201) {
        toast.success("Pdf's processado's!");
        setReloadDashConsumed([])
        setReloadDashEnergyTotalValue([])
      }

    } catch (error) {
      toast.error("Erro ao processar Pdf's");
      console.error('Error uploading files:', error);
    } finally {
      setIsloading(false)
    }
  };

  return (
    <Container>
      <Row className="mb-3 my-3  align-items-center justify-content-center ">
        <Col md={6} className='d-flex flex-column my-2'>
          <Form.Label>Carregue e processe suas faturas aqui!</Form.Label>
          <Form.Group controlId="formFile">
            <Form.Control type="file" multiple accept="application/pdf" onChange={handleFileChange} />
          </Form.Group>
          <Button className='my-2' variant='success' onClick={handleUpload} disabled={!selectedFiles || isLoading}>
            {isLoading && (
              <Spinner
                className='mx-2'
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Processar fatura
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
