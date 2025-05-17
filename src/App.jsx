import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Home from "./page/Home"

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>,
      children:[
        {
          path:"child",
          element:<div>child</div>
        },
      ]
    },
    {
      path:"anshu",
      element:<div>anshu</div>
    }
  ])

  return (
    <RouterProvider router={router}/>

  )
}

export default App