import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Dashboard from "./page/Dashboard"
import GlobalPage from "./page/GlobalPage"
import AgentDashboard from "./page/AgentDashboard"

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
        }
      ]
    },
  ])

  return (
    <RouterProvider router={router} />

  )
}

export default App