import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import Layout from './pages/Layout';
import Protected from './containers/Protected/Protected';
import HomePage from './pages/HomePage/Homepage';
import { NoMatchPage } from './pages/NoMatchPage/NoMatchPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';


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
        path: "messages",
        element: <MessagesPage />
      },
      {
        path: "*",
        element: <NoMatchPage />
      },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);