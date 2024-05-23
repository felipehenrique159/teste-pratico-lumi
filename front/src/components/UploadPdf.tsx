import React, { useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function UploadPDF() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

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
      }

    } catch (error) {
      toast.error("Erro ao processar Pdf's");
      console.error('Error uploading files:', error);
    } finally {
      setIsloading(false)
    }
  };

  return (
    <div>
      <Row className="mb-3 my-3">
        <Col md={5}>
          <Form.Group controlId="formFile">
            <Form.Label>Carregue e processe suas faturas aqui!</Form.Label>
            <Form.Control type="file" multiple accept="application/pdf" onChange={handleFileChange} />
          </Form.Group>
        </Col>
        <Col md={5} className='d-flex align-items-end justify-content-start'>
          <Button variant='success' onClick={handleUpload} disabled={!selectedFiles || isLoading}>
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

    </div>
  );
};
