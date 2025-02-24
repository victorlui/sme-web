import React from "react";
import DefaultLayout from "~/layout/default-layout";
import { useAuthStore } from "~/store/auth";

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const numbers: number[] = Array.from(
    { length: 100 },
    (_, index) => index + 1
  );

  return (
    <DefaultLayout>
      <p>Home {user?.name} </p>
      <div className="bg-red-300 w-10">
        {" "}
        {numbers.map((number) => (
          <p key={number} className="">
            {number}
          </p>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
