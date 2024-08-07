import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import {
  Dashboard,
  ItemsDetail,
  ItemsList,
  DetalheDePessoas,
  ListagemDePessoas,
  DetalheDeCidades,
  ListagemDeCidades,
  TransactionsList,
  TransactionsDetail
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'listAltIcon',
        path: '/pre-orcamento',
        label: 'Pré-Orçamentos',
      },
      {
        icon: 'inventoryIcon',
        path: '/items',
        label: 'Itens/Produtos',
      },
      {
        icon: 'location_city',
        path: '/cidades',
        label: 'Cidades',
      },
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Clientes',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pre-orcamento" element={< TransactionsList />} />
      <Route path="/pre-orcamento/detalhes/:id" element={<TransactionsDetail />} />

      <Route path="/items" element={<ItemsList />} />
      <Route path="/items/detail/:id" element={<ItemsDetail />} />

      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />

      <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
