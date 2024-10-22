import React from "react";

import SiglePostComponent from "@/components/layout/SiglePost";
import { BACKEND_URL } from "@/lib/constants";

// {
//   id: 1,
//   title: 'UPDATE',
//   content: 'TEST CONTENT',
//   createdAt: '2024-10-21T16:01:04.599Z',
//   updatedAt: '2024-10-21T16:15:11.896Z',
//   userId: 1,
//   categoryId: null,
//   comments: [
//     {
//       id: 1,
//       content: 'zxcxzcxzc',
//       createdAt: '2024-10-22T06:11:23.570Z',
//       userId: 1,
//       postId: 1
//     }
//   ]
// }

const Page = async ({ params }: { params: { id: string } }) => {
  const responsePost = await fetch(`${BACKEND_URL}/posts/${params.id}`);
  const post = await responsePost.json();

  return (
    <>
      <section>
        <h1>POST ID: {params.id}</h1>
        <SiglePostComponent post={post} />
      </section>
    </>
  );
};

export default Page;
