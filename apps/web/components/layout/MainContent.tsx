import {FC} from "react";

import type {Post }  from "./types"

interface MainContentProps {
  contents: Post[];
}
const MainContent:FC<MainContentProps> = ({contents}) => {
  return (
    <div>
      <h1>Main</h1>
      {contents.map((content) => (
        <div key={content.id}>
          <h2>{content.title}</h2>
          <p>User ID: {content.user_id}</p>
          <p>{content.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
