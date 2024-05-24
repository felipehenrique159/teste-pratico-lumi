import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import InvoiceLibrary from './pages/InvoiceLibrary';
import DataProvider from './contexts/DataDashboardContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/invoice-library",
    element: <InvoiceLibrary />,
  },
]);

function App() {
  return (
    <DataProvider>
        <ToastContainer />
        <RouterProvider router={router} />
    </DataProvider>
  )
}

export default App;
