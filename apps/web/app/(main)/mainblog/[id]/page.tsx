import React from "react";
import SiglePostComponent from "@/components/layout/SiglePost";
import { BACKEND_URL } from "@/lib/constants";
import { getSession } from "@/lib/session";
import { Session } from "@/lib/types";

const Page = async ({ params }: { params: { id: string } }) => {
  const responsePost = await fetch(`${BACKEND_URL}/posts/${params.id}`, {
    cache: "no-cache",
  });
  const post = await responsePost.json();
  const session: Session | null = await getSession();

  return (
    <>
      <section>
        <SiglePostComponent
          post={post}
          isSession={!!session}
          postId={params.id}
          sessionUserId={session?.user.id || null}
        />
      </section>
    </>
  );
};

export default Page;
