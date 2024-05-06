import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Bookings from "../Pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        {
          path: '/bookings',
          element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
        },
        {
          path: '/checkout/:id',
          element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
          loader: ({params}) => fetch(`https://car-doctor-server-58-59-60.vercel.app/services/${params.id}`)
        }
        
      ]
    },
  ]);

  export default router