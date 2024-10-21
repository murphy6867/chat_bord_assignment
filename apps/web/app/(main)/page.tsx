import { FC } from "react";

import MainContent from "@/components/layout/MainContent";
import { BACKEND_URL } from "@/lib/constants";

const HomePage: FC = async () => {
  const res = await fetch(`${BACKEND_URL}/posts`);
  const posts = await res.json();
  return (
    <div className="flex flex-1 min-h-screen overflow-hidden">
      <>
        <MainContent contents={posts} />
      </>
    </div>
  );
};

export default HomePage;
