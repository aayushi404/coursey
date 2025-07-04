import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Authentication } from './routes/authentication.jsx';
import { Login } from './routes/login.jsx';
import { SignUp, signUpAction } from './routes/signup.jsx';
import { Logout } from './routes/logout.jsx';
import { UserDashboard } from './routes/user/dashboard.jsx';
import { AdminDashboard } from './routes/admin/dashboard.jsx';
import { Courses } from './components/courses.jsx';

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
        element: <UserDashboard />,
        children: [
          { index: true, element: <Courses /> },
          { path: 'logout', element: <Logout /> }
        ]
      },
      {
        path: 'admin',
        element: <AdminDashboard />,
        children: [
          { index: true, element: <Courses /> },
          { path: 'logout', element: <Logout /> }
        ]
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)