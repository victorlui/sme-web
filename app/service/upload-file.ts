import { AxiosProgressEvent } from "axios";
import { api } from "~/api/api";

interface Props {
  file: File;
}

export const UploadService = async ({ file }: Props): Promise<string> => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const progress = progressEvent.total
          ? (progressEvent.loaded / progressEvent.total) * 100
          : 0;
        console.log(`Upload Progress: ${progress.toFixed(2)}%`);
        return progress;
      },
    };
    const { data } = await api.post("upload", formData, config);

    return data.file;
  } catch (error) {
    return "";
  }
};
