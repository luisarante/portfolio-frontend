import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import { App } from './App';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';

import { ProtectedRoute } from './components/ProtectedRoute.tsx'; 
import { AuthProvider } from './context/AuthContext'; 

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <NotFound />, 
    children: [
      { path: '/', element: <Home /> },
      { path: '/projetos/:id', element: <ProjectDetail /> },
      { path: '/login', element: <LoginPage /> }, 
      { 
        element: <ProtectedRoute />,
        children: [
          { path: '/painel', element: <Dashboard /> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);