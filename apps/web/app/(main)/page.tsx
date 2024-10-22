import { FC } from "react";

import { BACKEND_URL } from "@/lib/constants";
import MainBlog from "./mainblog/page";

const HomePage: FC = async () => {
  const responsePost = await fetch(`${BACKEND_URL}/posts`, {
    cache: "no-store",
  });
  const posts = await responsePost.json();

  return (
    <div>
      <>
        <MainBlog posts={posts} />
      </>
    </div>
  );
};

export default HomePage;
