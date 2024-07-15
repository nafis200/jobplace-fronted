import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Authprovider from './components/Authprovider.jsx'
import Main from './components/Main.jsx'
import Home from './components/Home.jsx'
const queryClient = new QueryClient()
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element:<Registration></Registration>
      },

    ]
  },
 
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
      </QueryClientProvider>
    </Authprovider>
  </React.StrictMode>,
)
