import { FC } from "react";

import MainContent from "@/components/layout/MainContent";
// import { BACKEND_URL } from "@/lib/constants";

const HomePage: FC = async () => {
  // const res = await fetch(`${BACKEND_URL}/posts`);
  // const posts = await res.json();
  const posts = [
    {
      id: 1,
      title: "NestJS",
      content: "Best Backend",
      user_id: 1,
      category_id: 7,
      created_at: "2024-10-21T07:33:25.552Z",
      updated_at: "2024-10-21T07:33:25.552Z",
    },
  ];
  return (
    <div className="flex flex-1 min-h-screen overflow-hidden">
      <div>
        <MainContent contents={posts} />
      </div>
    </div>
  );
};

export default HomePage;
