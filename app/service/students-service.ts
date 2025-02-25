import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "~/api/api";

interface Query {
  page: number;
  limit: number;
  search: string;
}

interface Students {
  id?: number;
  name: string;
  ra: string;
  serie: string;
}

interface StudentsResponse extends Students {
  school: string;
}

export interface StudentsRequest extends Students {
  name_of_dad: string;
  name_of_mother: string;
  date_of_birth: Date;
  school_id: string | number;
}

interface StudentsResponse {
  itens: Students[];
  totalItems: number;
  totalPage: number;
}

export type StudentsByID = {
  date_of_birth: string;
  id: number;
  name: string;
  name_of_dad: string;
  name_of_mother: string;
  ra: string;
  school: { id: number; name: string };
  serie: string;
};

export const GETAllStudents = async ({
  page,
  limit,
  search,
}: Query): Promise<StudentsResponse | null> => {
  try {
    const { data } = await api.get<StudentsResponse>(
      `/students?page=${page}&limit=${limit}${search ? `&name=${search}` : ""}`
    );
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};

export const GETByIdStudent = async (
  id: number
): Promise<StudentsByID | null> => {
  try {
    const { data } = await api.get(`/students/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error === "NENHUM ALUNO ENCONTRADO"
          ? "Nenhum aluno encontrado"
          : error.response?.data?.error || "Erro ao registrar aluno"
      );
    }
    throw new Error("Erro inesperado ao registrar aluno");
  }
};

export const DeleteStudent = async (id: number): Promise<boolean | string> => {
  try {
    await api.delete(`/students/${id}`);
    return true;
  } catch (error) {
    console.log("service", error);
    if (axios.isAxiosError(error)) {
      return error.response?.data?.error;
    }
    return "Erro ao deletar aluno";
  }
};

export const POSTStudents = async (
  student: StudentsRequest
): Promise<Students | null> => {
  try {
    const newStudent: StudentsRequest = {
      name: student.name,
      ra: student.ra,
      name_of_dad: student.name_of_dad,
      name_of_mother: student.name_of_mother,
      school_id: Number(student.school_id),
      serie: student.serie,
      date_of_birth: student.date_of_birth,
    };
    const { data } = await api.post<StudentsRequest>("/students", newStudent);

    if (!data) {
      console.log("Nenhum dado retornado após cadastro.");
      return null;
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Erro ao registrar aluno");
    }
    throw new Error("Erro inesperado ao registrar aluno");
  }
};
