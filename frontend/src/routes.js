import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import Diagnosis from './pages/diagnosis/Diagnosis';
import Login from './pages/auth/Login';
import NotFound from './pages/static/NotFound';
import NewDiagnosis from './pages/diagnosis/NewDiagnosis';
import ViewDiagnosis from './pages/diagnosis/ViewDiagnosis';
import Register from './pages/auth/Register';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home/diagnoses" />, index: true },
        { path: 'diagnoses', element: <Diagnosis /> },
        { path: 'diagnoses/new', element: <NewDiagnosis /> },
        { path: 'diagnoses/:id', element: <ViewDiagnosis /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/home/diagnoses" />, index: true },
        { path: 'not-found', element: <NotFound /> },
        { path: '*', element: <Navigate to="/not-found" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/not-found" replace />,
    },
  ]);

  return routes;
}
