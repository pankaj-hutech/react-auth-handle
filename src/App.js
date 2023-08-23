import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import './App.css';



import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path : '/profile',
      element:(<ProtectedRoute><Profile /></ProtectedRoute>),
          
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
