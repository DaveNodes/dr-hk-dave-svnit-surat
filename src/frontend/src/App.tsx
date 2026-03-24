import { Toaster } from "@/components/ui/sonner";
import {
  Navigate,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { useActor } from "./hooks/useActor";
import AdminDashboard from "./pages/AdminDashboard";
import ConnectPage from "./pages/ConnectPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PublicationsPage from "./pages/PublicationsPage";
import ResearchPage from "./pages/ResearchPage";
import StudentsPage from "./pages/StudentsPage";

// Route tree
const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const researchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/research",
  component: ResearchPage,
});

const publicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/publications",
  component: PublicationsPage,
});

const studentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/students",
  component: StudentsPage,
});

const connectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/connect",
  component: ConnectPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});

const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <Navigate to="/" />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  researchRoute,
  publicationsRoute,
  studentsRoute,
  connectRoute,
  loginRoute,
  adminRoute,
  catchAllRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppInit() {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.initializeData().catch(() => {
        // Silently handle if already initialized
      });
    }
  }, [actor]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppInit />
      <RouterProvider router={router} />
      <Toaster richColors />
    </AuthProvider>
  );
}
