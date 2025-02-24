import React from "react";
import Sidebar from "~/components/SideBar";

interface Props {
  children: React.ReactNode;
}
const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen md:min-h-screen w-full bg-neutral-800">
      <Sidebar />
      <div className="flex-1 p-5 md:ml-60 md:mt-10 md:p-0  md:mr-12 ">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
