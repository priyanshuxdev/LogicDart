import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ProtectedRoute } from "./components/index";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  SignUp,
  SignIn,
  AddBlog,
  EditBlog,
  AllBlog,
  Blog,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: (
          <ProtectedRoute authentication={false}>
            <SignIn />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedRoute authentication={false}>
            <SignUp />
          </ProtectedRoute>
        ),
      },
      {
        path: "/all-blog",
        element: (
          <ProtectedRoute authentication={true}>
            {" "}
            <AllBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-blog",
        element: (
          <ProtectedRoute authentication={true}>
            {" "}
            <AddBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-blog/:slug",
        element: (
          <ProtectedRoute authentication={true}>
            {" "}
            <EditBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/blog/:slug",
        element: <Blog />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
