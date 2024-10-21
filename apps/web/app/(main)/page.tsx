import { FC } from "react";

import MainContent from "@/components/layout/MainContent";
import { BACKEND_URL } from "@/lib/constants";

const HomePage: FC = async () => {
  // const responsePost = await fetch(`${BACKEND_URL}/posts`);
  const responsePost = await fetch(`${BACKEND_URL}/posts`);
  // const responseCategory = await fetch;
  const posts = await responsePost.json();

  // console.log("====================================");
  // console.log("posts", posts);
  // console.log("====================================");

  return (
    <div className="flex flex-1 min-h-screen overflow-hidden">
      <>
        <MainContent contents={posts} />
      </>
    </div>
  );
};

export default HomePage;
