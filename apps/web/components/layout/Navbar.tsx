"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  BlogIcon,
  HambergerBar,
  HomeIcon,
  RightArrow,
  SignOutIcon,
} from "@/public/icons/types";

import { Session } from "../../lib/types";
interface NavbarProps {
  session: Session | null;
}

export const Navbar: FC<NavbarProps> = ({ session }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
  };

  const menuItems = [
    { href: "/", label: "Home", icon: HomeIcon, alt: "Home icon alt text" },
    {
      href: "/ourblog",
      label: "Our Blog",
      icon: BlogIcon,
      alt: "Blog icon alt text",
    },
  ];

  return (
    <>
      <nav
        className={cn(
          "bg-emerald-950 fixed top-0 left-0 right-0 z-50 px-6",
          isMenuOpen && "brightness-50"
        )}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white italic">
              a Board
            </span>
          </Link>
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden z-50 text-white"
            onClick={toggleMenu}
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <Image src={HambergerBar} width={28} height={28} alt="Nar bar" />
            ) : (
              <Image src={HambergerBar} width={28} height={28} alt="Nar bar" />
            )}
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>
          </Button>
          <div className="hidden md:block">
            {session !== null ? (
              <div className="flex flex-row items-center space-x-4">
                <p className="text-3xl text-white">{session?.user.name}</p>
                <div className="w-10 h-10 rounded-full bg-white"></div>
                <Link href={"/api/auth/signout"}>
                  <Image
                    src={SignOutIcon}
                    width={25}
                    height={25}
                    alt={"Sign out icon alt"}
                  />
                </Link>
              </div>
            ) : (
              <Link href={"/signin"}>
                <Button className="font-medium text-md text-white bg-green-500 hover:bg-green-300 rounded-xl w-24 h-10">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-64 bg-emerald-950 p-6 transition-transform duration-300 ease-in-out transform rounded-s-xl",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-16">
          <Button
            size="icon"
            variant="ghost"
            className="text-white"
            onClick={toggleMenu}
          >
            <Image
              src={RightArrow}
              width={25}
              height={25}
              alt="Close nav arrow"
              className="me-3 text-white"
            />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        {session && (
          <div className="pb-6">
            <p className="text-3xl text-white">{session?.user.name}</p>
          </div>
        )}

        <ul className="space-y-6">
          {menuItems.map((item) => (
            <li key={item.href} className="flex flex-row space-x-3">
              <Image src={item.icon} width={25} height={25} alt={item.alt} />
              <Link
                href={item.href}
                className="flex items-center text-white hover:text-emerald-200 transition-colors"
                onClick={toggleMenu}
              >
                <p className="text-xl font-bold">{item.label}</p>
              </Link>
            </li>
          ))}
          {session !== null ? (
            <Link
              href={"/api/auth/signout"}
              className="flex flex-row space-x-3"
            >
              <Image
                src={SignOutIcon}
                width={25}
                height={25}
                alt={"Sign out icon alt"}
              />
              <p className="text-xl font-bold text-white">Sign Out</p>
            </Link>
          ) : (
            <Link href={"/signin"} className="flex flex-row space-x-3">
              <Image
                src={SignOutIcon}
                width={25}
                height={25}
                alt={"Sign out icon alt"}
              />
              <p className="text-xl font-bold text-white">Sign In</p>
            </Link>
          )}
        </ul>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};
