import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './Layout/Root.jsx'
import Home from './component/Home/Home.jsx'
import AllProduct from './component/AllProduct/AllProduct.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import Login from './component/Login/Login.jsx'
import Register from './component/Register/Register.jsx'
import MyProducts from './component/MyProducts/MyProducts.jsx'
import MyBids from './component/MyBids/MyBids.jsx'
import PrivateRoutes from './PrivateRoutes/PrivateRoutes.jsx'
import ViewDetails from './component/Home/ViewDetails.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "allproduct",
        Component: AllProduct
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "myProducts",
        element: <PrivateRoutes>
          <MyProducts></MyProducts>
        </PrivateRoutes>
      },
      {
        path: "myBids",
        element: <PrivateRoutes>
          <MyBids></MyBids>
        </PrivateRoutes>
      },
      {
        path: "/product/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/product/${params.id}`),
        Component: ViewDetails,
      }
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>

  </StrictMode>,
)
