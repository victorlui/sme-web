import axios from "axios";
import { api } from "~/api/api";

interface PropsGetSchools {
  page: number;
  limit: number;
  search: string;
}

interface SchoolsProps {
  id: number;
  name: string;
}

interface ResponseProps {
  itens: SchoolsProps[];
  totalItems: number;
  totalPage: number;
}

export const GETSchoolsService = async ({
  limit,
  page,
  search,
}: PropsGetSchools): Promise<ResponseProps | null> => {
  try {
    const { data } = await api.get<ResponseProps>(
      `/schools?page=${page}&limit=${limit}${search ? `&name=${search}` : ""}`
    );
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};

export const POSTSchoolService = async (name: string): Promise<any> => {
  try {
    const { data } = await api.post<any>("schools", { name });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Erro ao cadastrar escola"
      );
    }
    throw new Error("Erro inesperado ao cadastrar escola");
  }
};
