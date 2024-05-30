import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/home page/HomePage";

const router = createBrowserRouter([
  {
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
