import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import InvoiceLibrary from './pages/InvoiceLibrary';
import { Container } from 'react-bootstrap';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/invoice-library",
    element: <InvoiceLibrary/>,
  },
]);

function App() {
  return (
    <Container className='d-flex justify-content-center flex-column' style={{height: '100vh'}}>
        <ToastContainer/>
        <RouterProvider router={router} />
    </Container>
  )
}

export default App;
