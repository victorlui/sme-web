import type { Route } from "./+types/login";
import LoginPage from "~/pages/auth/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <LoginPage />;
}
