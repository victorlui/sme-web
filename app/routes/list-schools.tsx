import React from "react";
import ListSchoolsPage from "~/pages/dashboard/schools/list-schools";
import { Route } from "./+types/list-schools";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Escolas" },
    { name: "description", content: "Lista de escolas" },
  ];
}

const ListSchools: React.FC = () => {
  return <ListSchoolsPage />;
};

export default ListSchools;
