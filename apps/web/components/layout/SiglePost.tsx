import { FC } from "react";

import type { SiglePost } from "./types";

interface SiglePostProps {
  post: SiglePost;
}

const SiglePostComponent: FC<SiglePostProps> = ({ post }) => {
  console.log("====================================");
  console.log(post);
  console.log("====================================");
  return <div>SiglePost: {post.id}</div>;
};

export default SiglePostComponent;
