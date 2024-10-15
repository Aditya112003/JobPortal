import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppLayout from "./layout/AppLayout";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import JobListings from "./pages/JobListings";
import Job from "./pages/Job";
import PostJob from "./pages/PostJob";
import SavedJob from "./pages/SavedJob";
import MyJobs from "./pages/MyJobs";
import ProtectedRoute from "./components/ProtectedRoute";
import JobApplications from "./pages/JobApplications";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },

      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },

      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListings />
          </ProtectedRoute>
        ),
      },

      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        ),
      },

      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },

      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJob />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },

      {
        path: "applications/:id",
        element: (
          <ProtectedRoute>
            <JobApplications />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
