import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "./pages/layout page/LayoutPage";
import HomePage from "./pages/home page/HomePage";
import AddSalePage from "./pages/add sale page/AddSalePage";
import EditPage from "./pages/edit page/EditPage";

const router = createBrowserRouter([
  {
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-sale",
        element: <AddSalePage />,
      },
      {
        path: "/edit-sale/:id",
        element: <EditPage />,
      },
    ],
  },
]);

export default router;
