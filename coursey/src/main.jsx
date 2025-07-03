import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Authentication } from './components/authentication.jsx';
import { Login } from './components/login.jsx';
import { SignUp, signUpAction } from './components/signup.jsx';
import { UserDashboard } from './routes/user/dashboard.jsx';
import { AdminDashboard } from './routes/admin/dashboard.jsx';
const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Authentication />
        
      },
      {
        path: 'login/:authr',
        element: <Login />,
      },
      {
        path: 'signUp/:authr',
        element: <SignUp />,
        action: signUpAction
      },
      {
        path: 'user',
        element:<UserDashboard />
      },
      {
        path: 'admin',
        element:<AdminDashboard />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
