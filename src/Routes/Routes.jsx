import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import BookService from "../Pages/BookService/BookService";
import Bookings from "../Pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";
import About from"./../Pages/Home/About/About";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element:<Home></Home>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/login',
          element:<Login></Login>,
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        {
          path:'book/:id',
          element:<PrivateRoute><BookService></BookService></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5100/services/${params.id}`)
        },
        {
         path: 'bookings',
         element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
        }
      ]
    },
  ]);


  export default router;