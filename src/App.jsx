import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Dashboard from "./page/Dashboard"

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Dashboard/>,
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