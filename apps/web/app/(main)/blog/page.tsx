import { FC } from "react";

import SideBar from "@/components/layout/SideBar";
import MainContent from "@/components/layout/MainContent";

const HomePage: FC = () => {
  return (
    <div className="flex flex-1 min-h-screen pt-16 overflow-hidden">
      <div className="fixed top-16 bottom-0 w-[30%]  overflow-y-auto ps-10 pt-16 hidden md:block">
        <SideBar />
      </div>
      <div className="ml-0 md:ml-[30%] w-full md:w-[70%]  overflow-y-auto py-5 px-6">
        <MainContent />
      </div>
    </div>
  );
};

export default HomePage;
