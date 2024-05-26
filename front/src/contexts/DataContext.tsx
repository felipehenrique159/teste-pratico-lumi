import { createContext, useState } from 'react';
import api from '../services/api';

export const DataContext = createContext({});

const DataProvider = ({ children }: any) => {
  const [reloadDashConsumed, setReloadDashConsumed] = useState([]);
  const [reloadDashEnergyTotalValue, setReloadDashEnergyTotalValue] = useState([]);
  const [reloadCustomers, setReloadCustomers] = useState([])
  const [idCustomer, setIdCustomer] = useState(null);

  const listDashConsumed = async () => {
    try {
      return await api.get(`list-dash-energy-consumed/${idCustomer}`);
    } catch (error) {
      console.error('Erro ao listar dash de energia consumida!', error);
    }
  };

  const listDashEnergyTotalValue = async () => {
    try {
      return await api.get(`list-dash-energy-economy/${idCustomer}`);
    } catch (error) {
      console.error('Erro ao listar dash de valor total', error);
    }
  };

  const listAllCustomers = async () => {
    try {
      return await api.get(`list-all-customers`);
    } catch (error) {
      console.error('Erro ao listar customers', error);
    }
  }

  return (
    <DataContext.Provider value={{
        listDashConsumed,
        listDashEnergyTotalValue,
        reloadDashConsumed,
        reloadDashEnergyTotalValue,
        setReloadDashConsumed,
        setReloadDashEnergyTotalValue,
        setIdCustomer,
        listAllCustomers,
        setReloadCustomers,
        reloadCustomers,
        idCustomer
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider
