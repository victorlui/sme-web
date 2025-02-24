import React from "react";
import { FaFile } from "react-icons/fa";
import Modal from "~/components/Modal";

interface Props {
  onClose: () => void;
  service: {
    id: number;
    date_service: string;
    reason: string;
    file: string;
    user: string;
  };
}

const ModalView: React.FC<Props> = ({ onClose, service }) => {
  const downloadFile = async () => {
    try {
      const response = await fetch(service.file);
      if (!response.ok) throw new Error("Erro ao baixar o arquivo");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = service.file.split("/").pop() || "download.txt"; // Nome do arquivo
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  };

  return (
    <Modal
      width="md:w-7/12"
      onClose={onClose}
      isButtonSubmit={false}
      title="Visualização do atendimento"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="felx flex-col gap-3">
            <p>Criado por:</p>
            <h1 className="mt-2 text-2xl">{service.user}</h1>
          </div>
          <div className="felx flex-col gap-3">
            <p className="text-right">Atendimento realizado dia:</p>
            <h1 className="text-right mt-2 text-2xl">{service.date_service}</h1>
          </div>
        </div>

        <div className="my-8">
          <p className="mb-3">Motivo do atendimento:</p>
          <div className=" h-75 overflow-y-auto scroll">{service.reason}</div>
        </div>

        {service.file && (
          <div>
            <p>Arquivo anexado:</p>
            <div className="my-3 flex flex-col items-center gap-2  w-40 p-2">
              <FaFile size={30} />
              <p>{service.file.split("/").pop()}</p>
              <button
                onClick={downloadFile}
                className="border rounded-md p-2 cursor-pointer"
              >
                Baixar arquivo
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalView;
