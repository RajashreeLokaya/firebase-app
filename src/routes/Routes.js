import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/LoginPage/Login";
import LandingPage from "../pages/LandingPage/Landing";
import SignUp from "../pages/SignUpPage/SignUp";
import ChatApp from "../pages/ChatPage/Chat";
import AppLayout from "../components/AppLayout";
import PhotoUpload from "../pages/PhotoUpload/PhotoUpload";
import TaskComponent from "../pages/ToDoPage/ToDoPage";
// import Welome from "../pages/Welcome/Welome";

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Welome />,
  // },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/landingPage",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <LandingPage />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/chatPage",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <ChatApp />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/todoPage",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <TaskComponent />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/uploadPage",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <PhotoUpload />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
]);
