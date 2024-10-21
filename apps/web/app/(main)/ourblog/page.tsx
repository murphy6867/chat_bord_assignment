import { getProfile } from "@/lib/actions";
import React from "react";

const OurBlog = async () => {
  const session = await getProfile();
  return <div className="">{JSON.stringify(session)}</div>;
};

export default OurBlog;
