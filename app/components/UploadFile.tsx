import React, { useEffect, useState } from "react";

import { useUploadHook } from "~/hooks/useUpload";
import FullSpinner from "./FullSpinner";

interface Props {
  fileUrl?: string;
  funcHandleFileChange: (fileUrl: string | "") => void;
}

const UploadFile: React.FC<Props> = ({
  fileUrl = "",
  funcHandleFileChange,
}) => {
  const { mutate, data, isPending } = useUploadHook();
  const [file, setFile] = useState<File | null>(null);

  console.log("file", fileUrl);

  useEffect(() => {
    if (data) {
      funcHandleFileChange(data);
    }
  }, [data]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      mutate({ file: selectedFile });
    }
  };

  return (
    <div>
      {isPending && <FullSpinner />}
      <label className="mb-3 block text-[16px]  font-semibold ">
        Upload File
      </label>
      <label className="flex flex-row items-center cursor-pointer border  rounded-md border-neutral-500">
        <div className="bg-pink w-[200px] px-3 rounded-l-md py-2">
          <p>Selecione um arquivo</p>
        </div>
        {file ? (
          <p className="mx-3">{(file as File).name}</p>
        ) : fileUrl ? (
          <p className="mx-3">{fileUrl.split("/").pop()}</p>
        ) : (
          <p className="mx-3">Nenhum arquivo selecionado</p>
        )}

        <input
          accept=".txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default UploadFile;
