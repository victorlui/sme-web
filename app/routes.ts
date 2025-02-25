import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/students.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("escolas", "routes/list-schools.tsx"),
  //route("alunos", "routes/students.tsx"),
  route("atendimento/:idAluno", "routes/student-service.tsx"),
] satisfies RouteConfig;
