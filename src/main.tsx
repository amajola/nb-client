import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "@/screens/Login";
import Signup from "@/screens/Signup";
import VerifyEmail from "@/screens/VerifyEmail";
import ProtectedRoute from "./components/protected";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Profile } from "./screens/Profile";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "verify-email", element: <VerifyEmail /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
