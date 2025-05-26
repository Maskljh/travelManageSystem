import Layout from "../pages/Layout";

import Home from "../pages/Home"
import Test from "../pages/Test"

import { createBrowserRouter } from "react-router-dom";


const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout></Layout>,
    children:[
      {
        index:true,
        // path:'home',
        element:<Home></Home>
      },
      {
        path:'test',
        element:<Test></Test>
      },
    ]
  },
])

export default router