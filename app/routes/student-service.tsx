import React from "react";
import { Route } from "./+types/student-service";
import StudentServicePage from "~/pages/dashboard/student-service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Atendimento" },
    { name: "description", content: "Atendimento" },
  ];
}

const StudentServiceRoot: React.FC = () => {
  return <StudentServicePage />;
};

export default StudentServiceRoot;
