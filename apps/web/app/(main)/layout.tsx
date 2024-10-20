import React, { PropsWithChildren } from "react";

import Navbar from "@/components/layout/Navbar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <body>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="min-w-full min-h-screen">{children}</div>
      </main>
    </body>
  );
};

export default MainLayout;
