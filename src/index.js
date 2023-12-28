import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import './index.css';
import Layout from './pages/Layout';
import Protected from './containers/Protected/Protected';
import HomePage from './pages/HomePage/Homepage';
import { NoMatchPage } from './pages/NoMatchPage/NoMatchPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import Temp from './components/Temp/Temp';
import LoginPage from './pages/LoginPage/LoginPage';
import PrivateConversation from './components/PrivateConversation/PrivateConversation';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Protected><HomePage /></Protected>
      },
      {
        path: "messages/:userId",
        element: <Protected><MessagesPage /></Protected>,
        children: [
          {
            path: "message/:recipientId",
            element: <PrivateConversation />
          },
        ]
      },
      {
        path: "temp",
        element: <Temp />
      },
      {
        path: "*",
        element: <NoMatchPage />
      },
    ]
  },
  {
    path: "login",
    element: <LoginPage />
  },
]);


createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);