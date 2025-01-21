import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Tasks from "./Pages/Tasks";
import Layout from "./Components/Layout";
import Overview from "./Pages/Overview";
import Backlog from "./Pages/Backlog";
import TeamMembers from "./Pages/TeamMembers";
import Home from "./Pages/Home";
import PrivateRoute from "./Components/PrivateRoute";
import PageNotFound from "./Components/PageNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute element={<Layout />} />,
      children: [
        {
          path: "overview",
          element: <Overview />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "backlog-tasks",
          element: <Backlog />,
        },
        {
          path: "team-members",
          element: <TeamMembers />,
        },
      ],
    },
    {
      index: true,
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
