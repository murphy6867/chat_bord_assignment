import React from "react";
import Image from "next/image";
import Link from "next/link";

import { BlogIconBlack, HomeIconBlack } from "@/public/icons/types";

const SideBar = () => {
  const menuItems = [
    {
      href: "/",
      label: "Home",
      icon: HomeIconBlack,
      alt: "Home icon alt text",
    },
    {
      href: "/ourblog",
      label: "Our Blog",
      icon: BlogIconBlack,
      alt: "Blog icon alt text",
    },
  ];

  return (
    <div className="sm:w-2/3 md:w-3/4 lg:w-2/4 ">
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center text-black hover:text-emerald-900 transition-colors"
            >
              <Image
                src={item.icon}
                width={25}
                height={25}
                alt={item.alt}
                className="me-3 text-black"
              />
              <p className="text-xl font-bold">{item.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
