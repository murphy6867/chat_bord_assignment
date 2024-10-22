import React from "react";
import { getProfile } from "@/lib/actions";
import { BACKEND_URL } from "@/lib/constants";
import OurContent from "@/components/layout/OurContent";

const OurBlog = async () => {
  const session = await getProfile();

  const responsePost = await fetch(
    `http://localhost:8000/posts/users/${session.message}`,
    {
      cache: "no-store",
    }
  );
  const responseCategory = await fetch(`${BACKEND_URL}/category`, {
    cache: "no-store",
  });

  const posts = await responsePost.json();
  const categories = await responseCategory.json();

  return (
    <div className="flex flex-1 min-h-screen overflow-hidden">
      <OurContent
        contents={posts}
        category={categories}
        userId={session.message}
      />
    </div>
  );
};

export default OurBlog;
