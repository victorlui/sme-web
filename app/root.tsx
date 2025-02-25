import {
  isRouteErrorResponse,
  Links,
  Meta,
  Navigate,
  Outlet,
  Route,
  Routes,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Route as CustomRoute } from "./+types/root";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./store/auth";
import LoginPage from "./pages/auth/login";
import { PrivateRoute } from "./routes/private-route";
import HomePage from "./pages/dashboard/home-page";
import RegisterPage from "./pages/auth/register";
import { ToastContainer } from "react-toastify";
import ListSchoolsPage from "./pages/dashboard/schools/list-schools";
import StudentsPage from "./pages/dashboard/students";
import StudentServicePage from "./pages/dashboard/student-service";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient();

export default function App() {
  const { token } = useAuthStore();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/" replace /> : <RegisterPage />}
        />

        <Route element={<PrivateRoute />}>
          <Route path="/escolas" element={<ListSchoolsPage />} />
          <Route path="/" element={<StudentsPage />} />
          <Route
            path="/atendimento/:idAluno"
            element={<StudentServicePage />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: CustomRoute.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
