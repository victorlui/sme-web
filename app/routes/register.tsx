import RegisterPage from "~/pages/auth/register";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Criar conta" },
    { name: "description", content: "Criar conta" },
  ];
}

export default function Register() {
  return <RegisterPage />;
}
