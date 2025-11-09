import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { App } from './App.tsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // {
      //   path: '/contato',
      //   element: <Contato />, 
      // },
    ],
  },

  {
    path: '/projetos/:id',
    element: <ProjectDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);