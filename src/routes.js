import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import UserEdit, { userLoader } from "./pages/UserEdit";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:userId",
    element: <UserEdit />,
    loader: userLoader,
  },
  {
    path: "/signin",
    element: <SignIn />,
  }
]);

export default router;
