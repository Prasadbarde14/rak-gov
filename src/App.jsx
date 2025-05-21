import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Dashboard from "./page/Dashboard"
import GlobalPage from "./page/GlobalPage"
import AgentDashboard from "./page/AgentDashboard"
import Canvas from "./page/Canvas"
import ActionPlanDashboard from "./page/ActionPlanDashboard"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GlobalPage />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/agent",
          element: <AgentDashboard/>
        },
        {
          path:"/public-works/okr-canvas",
          element:<Canvas/>
        },{
          path:"/public-works/action-plan",
          element:<ActionPlanDashboard/>
        }
      ]
    },
  ])

  return (
    <RouterProvider router={router} />

  )
}

export default App