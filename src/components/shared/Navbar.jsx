import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCartPlus, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const navItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Services",
      path: "/services",
    },
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];
  return (
    <div className="bg-slate-400 text-slate-900">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <Link href={"/"}>
            <Image
              alt="logo"
              src="/assets/logo.svg"
              height={60}
              width={100}
            ></Image>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                className="font-semibold hover:text-primary duration-300"
                href={item.path}
                key={item.path}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex items-center space-x-3">
            <FaCartPlus className="text-xl cursor-pointer" />
            <FaSearch className="text-xl cursor-pointer" />
            <a className="btn btn-outline btn-primary px-8">Appointment</a>
          </div>
          <Link href="/login" className="btn btn-primary mx-5 px-8">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
