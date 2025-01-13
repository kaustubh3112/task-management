import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Tasks from "./Pages/Tasks";
import Layout from "./Components/Layout";
import Overview from "./Pages/Overview";
import Backlog from "./Pages/Backlog";
import TeamMembers from "./Pages/TeamMembers";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home";
function App() {
  const router = createBrowserRouter([
    {
      index: true,
      element: <Home />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/overview",
          element: <Overview />,
        },
        {
          path: "/tasks",
          element: <Tasks />,
        },
        {
          path: "/backlog-tasks",
          element: <Backlog />,
        },
        {
          path: "/team-members",
          element: <TeamMembers />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
