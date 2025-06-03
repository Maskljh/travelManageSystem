import Layout from "../pages/Layout";

import Home from "../pages/Home"
import Test from "../pages/Test"
import Demo1 from "../pages/Demo/Demo1"
import Demo2 from "../pages/Demo/Demo2"
import Demo3 from "../pages/Demo/Demo3"

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/test',
        element: <Test></Test>
      },
      {
        path: '/demo1',
        element: <Demo1></Demo1>
      },
      {
        path: '/demo2',
        element: <Demo2></Demo2>
      },
      {
        path: '/demo3',
        element: <Demo3></Demo3>
      }
    ]
  },
])

export default router