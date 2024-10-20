import { FC } from "react";

import MainContent from "@/components/layout/MainContent";

const HomePage: FC = () => {
  return (
    <div className="flex flex-1 min-h-screen overflow-hidden">
      <div>
        <MainContent />
      </div>
    </div>
  );
};

export default HomePage;
