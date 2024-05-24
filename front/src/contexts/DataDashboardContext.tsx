import { createContext, useState } from 'react';
import api from '../services/api';

export const DataContext = createContext({});

const DataProvider = ({ children }: any) => {
  const [reloadDashConsumed, setReloadDashConsumed] = useState([]);
  const [reloadDashEnergyTotalValue, setReloadDashEnergyTotalValue] = useState([]);

  const listDashConsumed = async () => {
    try {
      return await api.get('list-dash-energy-consumed');
    } catch (error) {
      console.error('Erro ao listar dash de energia consumida!', error);
    }
  };

  const listDashEnergyTotalValue = async () => {
    try {
      return await api.get('list-dash-energy-economy');
    } catch (error) {
      console.error('Erro ao listar dash de valor total', error);
    }
  };

  return (
    <DataContext.Provider value={{
        listDashConsumed,
        listDashEnergyTotalValue,
        reloadDashConsumed,
        reloadDashEnergyTotalValue,
        setReloadDashConsumed,
        setReloadDashEnergyTotalValue
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider
