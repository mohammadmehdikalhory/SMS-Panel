import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DashboardHome } from "./pages/DashboardHome";
import { Messages } from "./pages/Messages";
import { Contacts } from "./pages/Contacts";
import { Wallet } from "./pages/Wallet";
import { DefaultTexts } from "./pages/DefaultTexts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        path: "dashboard",
        Component: DashboardHome,
      },
      {
        path: "messages",
        Component: Messages,
      },
      {
        path: "contacts",
        Component: Contacts,
      },
      {
        path: "wallet",
        Component: Wallet,
      },
      {
        path: "default-texts",
        Component: DefaultTexts,
      },
    ],
  },
]);