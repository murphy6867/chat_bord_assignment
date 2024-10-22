import { FC } from "react";
import MainContent from "@/components/layout/MainContent";
import type { Post } from "@/components/layout/types";

interface MainBlogProps {
  posts: Post[];
}

const MainBlog: FC<MainBlogProps> = ({ posts }) => {
  return (
    <div className="flex flex-1 min-h-screen overflow-hidden">
      <MainContent contents={posts} />
    </div>
  );
};

export default MainBlog;
