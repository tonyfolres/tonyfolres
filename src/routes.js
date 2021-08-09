import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Authorized from './components/Authorized';
import AccessDenied from './pages/AccessDenied';

const AuthorizedDashboard = () => (
  <Authorized userTypes={['admin']}>
    <Dashboard />
  </Authorized>
);

const AuthorizedAppointments = () => (
  <Authorized userTypes={['admin', 'creator']}>
    <ProductList />
  </Authorized>
);

const AuthorizedCreators = () => (
  <Authorized userTypes={['admin']}>
    <CustomerList />
  </Authorized>
);

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'creators', element: <AuthorizedCreators /> },
      { path: 'dashboard', element: <AuthorizedDashboard /> },
      { path: 'appointments', element: <AuthorizedAppointments /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '403', element: <AccessDenied /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
