import React from "react";
import { Route } from "./+types/students";
import StudentsPage from "~/pages/dashboard/students";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Alunos" },
    { name: "description", content: "Lista de alunos" },
  ];
}

const StudentsRooute: React.FC = () => {
  return <StudentsPage />;
};

export default StudentsRooute;
