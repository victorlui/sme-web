import axios from "axios";
import { api } from "~/api/api";

interface Query {
  page: number;
  limit: number;
  idStudent: any;
  selectedDate: Date | null;
}

export type ServiceStudentsProps = {
  id: number;
  date_service: string;
  file: string;
  reason: string;
  student: {
    id: number;
    name: string;
    ra: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type ResponseService = {
  itens: ServiceStudentsProps[];
  totalItems: number;
  totalPage: number;
};

interface ServiceStudentRequest {
  student_id: number;
  user_id: number;
  date_service: string;
  reason: string;
  file: string;
  id?: number;
}

export const GETAllStudentsService = async ({
  page,
  limit,
  idStudent,
  selectedDate,
}: Query): Promise<ResponseService> => {
  try {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
      .format(selectedDate ? new Date(selectedDate) : new Date())
      .replace(/\//g, "-");

    const { data } = await api.get<any>(
      `/service-students?page=${page}&limit=${limit}&idStudent=${idStudent}${
        selectedDate ? `&date_initial=${formattedDate}` : ""
      }`
    );
    if (!data) {
      return {
        itens: [],
        totalItems: 0,
        totalPage: 0,
      };
    }

    console.log("service", formattedDate);
    return data;
  } catch (error) {
    return {
      itens: [],
      totalItems: 0,
      totalPage: 0,
    };
  }
};

export const DeleteStudentService = async (id: number): Promise<boolean> => {
  try {
    const { data } = await api.delete(`/service-students/${id}`);
    return data;
  } catch (error) {
    return false;
  }
};

// export const GETByIdStudent = async (
//   id: number
// ): Promise<StudentsByID | null> => {
//   try {
//     const { data } = await api.get(`/students/${id}`);
//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.error === "NENHUM ALUNO ENCONTRADO"
//           ? "Nenhum aluno encontrado"
//           : error.response?.data?.error || "Erro ao registrar aluno"
//       );
//     }
//     throw new Error("Erro inesperado ao registrar aluno");
//   }
// };

export const POSTServiceStudents = async (
  student: ServiceStudentRequest
): Promise<boolean | null> => {
  try {
    const newStudent: ServiceStudentRequest = {
      reason: student.reason,
      file: student.file,
      student_id: student.student_id,
      user_id: student.user_id,
      date_service: student.date_service,
    };

    if (student.id) {
      await api.patch<ServiceStudentRequest>(
        `/service-students/${student.id}`,
        newStudent
      );

      return true;
    }
    await api.post<ServiceStudentRequest>("/service-students", newStudent);

    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro ao registrar aluno");
    }
    throw new Error("Erro inesperado ao registrar aluno");
  }
};
