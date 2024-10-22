import { PropsWithChildren } from "react";

import { Navbar } from "../../components/layout/Navbar";
import SideBar from "../../components/layout/SideBar";

import { getSession } from "../../lib/session";

import { Session } from "../../lib/types";

const MainLayout = async ({ children }: PropsWithChildren<{}>) => {
  const session: Session | null = await getSession();

  return (
    <div>
      <Navbar session={session} />
      <main className="min-w-full min-h-screen flex flex-1 bg-stone-300 pt-24 px-4 md:pt-28 md:px-10 overflow-hidden">
        <section className="w-[30%] lg:max-w-[20%] hidden md:block fixed overflow-y-auto">
          <SideBar />
        </section>
        <section className="w-full md:w-[70%] overflow-y-auto ml-0 md:ml-[35%] lg:ml-[20%]">
          {children}
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
