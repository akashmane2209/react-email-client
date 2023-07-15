import { RouteObject, useRoutes } from "react-router-dom";

import EamilList from "@/pages/EmailList";
import EmailItem from "@/pages/EmailItem";
import MainLayout from "@/layouts/Main";
import { EmailContextProvider } from "./contexts/EmailContext";

const routes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <EamilList />,
      children: [
        {
          path: "/:id",
          element: <EmailItem />,
        },
      ],
    },
  ],
};

function App() {
  const routing = useRoutes([routes]);
  return <EmailContextProvider>{routing}</EmailContextProvider>;
}

export default App;
