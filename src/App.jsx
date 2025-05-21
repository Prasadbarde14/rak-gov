import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Dashboard from "./page/Dashboard"
import GlobalPage from "./page/GlobalPage"
import AgentDashboard from "./page/AgentDashboard"
import KPIBoard from "./page/KPIboard"
import NotFound from "./page/404/NotFound"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GlobalPage />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        }
        ,
        {
          path: "/public-works/kpi-board",
          element: <KPIBoard />
        },
        {
          path: "/agent",
          element: <AgentDashboard />
        },

      ]
    },
    {
      path: "*",
      element: <NotFound/>
    },
  ])

  return (
    <RouterProvider router={router} />

  )
}

export default App