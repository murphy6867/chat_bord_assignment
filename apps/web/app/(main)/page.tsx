import { FC } from "react";

import { BACKEND_URL } from "@/lib/constants";
// import MainBlog from "./mainblog/page";
import MainContent from "@/components/layout/MainContent";
import { Session } from "@/lib/types";
import { getSession } from "@/lib/session";

const HomePage: FC = async () => {
  const session: Session | null = await getSession();

  const responsePost = await fetch(`${BACKEND_URL}/posts`, {
    cache: "no-store",
  });

  const responseCategory = await fetch(`${BACKEND_URL}/category`, {
    cache: "no-store",
  });
  const posts = await responsePost.json();
  const categories = await responseCategory.json();

  return (
    <div>
      <>
        {/* <MainBlog posts={posts} category={categories} /> */}
        <div className="flex flex-1 min-h-screen overflow-hidden">
          <MainContent
            contents={posts}
            category={categories}
            sessionUserId={session?.user.id || null}
          />
        </div>
      </>
    </div>
  );
};

export default HomePage;
