"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  BlogIcon,
  HambergerBar,
  HomeIcon,
  RightArrow,
} from "@/public/icons/types";

export default function Navbar() {
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
    { href: "/blog", label: "Home", icon: HomeIcon, alt: "Home icon alt text" },
    {
      href: "/myblog",
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
            <Link href={"/signin"}>
                <Button className="font-medium text-md text-white bg-green-500 hover:bg-green-300 rounded-xl w-24 h-10">
                  Sign In
                </Button>
            </Link>
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
        <ul className="space-y-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center text-white hover:text-emerald-200 transition-colors"
                onClick={toggleMenu}
              >
                <Image
                  src={item.icon}
                  width={25}
                  height={25}
                  alt={item.alt}
                  className="me-3 text-white"
                />
                <p className="text-xl font-bold">{item.label}</p>
              </Link>
            </li>
          ))}
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
}
