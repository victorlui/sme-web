import React from "react";

interface Props {
  title: string;
  btnSubmitText?: string;
  isLoading?: boolean;
  onSubmit?: () => void;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  isButtonSubmit?: boolean;
}

const Modal: React.FC<Props> = ({
  title,
  children,
  btnSubmitText = "Salvar",
  width = "md:w-4/12 xl:w-2/12",
  isLoading = false,
  onClose,
  onSubmit = () => {},
  isButtonSubmit = true,
}) => {
  return (
    <div className="absolute h-screen w-screen top-0 right-0 backdrop-blur-sm flex items-center justify-center z-30 ">
      <div
        className={`m-auto rounded-xl bg-neutral-600 border border-secondary-color4 shadow-xl pt-5 pb-5 ${width}`}
      >
        <div className="flex items-end justify-end"></div>
        <div className=" flex flex-row justify-between  items-center border-b border-secondary-color4  px-5  ">
          <h1 className="font-semibold text-left text-2xl mb-4 text-neutral-200 ">
            {title}
          </h1>
        </div>
        <div className="p-5">{children}</div>
        <div className="flex justify-end items-center px-5">
          {!isLoading && (
            <>
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              >
                Cancelar
              </button>

              {isButtonSubmit && (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="px-4 cursor-pointer py-2 ml-2 bg-pink  text-white text-sm font-medium rounded-md"
                >
                  {btnSubmitText}
                </button>
              )}
            </>
          )}

          {isLoading && (
            <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-t-blue-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
