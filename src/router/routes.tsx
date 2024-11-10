import Dashboard from "src/pages/Dashboard";
import BillTrackingApp from "src/pages/BillTrackingApp/BillTrackingApp";
import LoginPage from "src/pages/login/LoginPage";
import NotFoundPage from "src/pages/NotFoundPage";
import SettingsMenu from "src/pages/SettingsMenu";
import ProfilePage from "src/pages/Profile/Profile";
import NotificationPage from "src/pages/Notification/NotificationPage";

// Define route information for scalability and easier modification
const routes = [
  {
    path: "/",
    element: <Dashboard />,
    title: "Dashboard",
    isProtected: false,
  },
  {
    path: "/bills",
    element: <BillTrackingApp />,
    title: "Bill Tracking",
    isProtected: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    title: "Login",
    isProtected: false,
  },
  {
    path: "/settings",
    element: <SettingsMenu />,
    title: "Settings",
    isProtected: false,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    title: "profile",
    isProtected: false,
  },
  {
    path: "/notifications",
    element: <NotificationPage />,
    title: "notifications",
    isProtected: false,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    title: "Not Found",
    isProtected: false,
  },
];

export default routes;
