import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo_circle_crop.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing Sublinks result:", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {
    // fetchSubLinks(); // Uncomment if needed
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-between border-b-[1px] border-b-gray-700 
        ${token !== null ? "fixed top-0 left-0 w-full bg-[#111827] z-50" : ""}`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* Logo */}
        <div className="ml-25">
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              width={50}
              height={50}
              loading="lazy"
              alt="Logo"
            />
            <p className="font-extrabold text-sky-300 text-2xl">
              WorkerHelp
            </p>
          </Link>
        </div>

        {/* Nav Links */}
        <nav>
          <ul className="flex gap-x-6 text-gray-50">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>
                  <p
                    className={`${
                      matchRoute(link.path)
                        ? "text-blue-400"
                        : "text-gray-50"
                    } hover:text-sky-600 flex items-center gap-1`}
                  >
                    {link.title}
                    {link.title === "Catalog" && <IoIosArrowDropdownCircle />}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Profile */}
        <div className="flex gap-x-4 items-center">
          {token === null && (
            <>
              <Link to="/login">
                <button
                  className={`px-3 py-1.5 rounded-md border ${
                    location.pathname === "/login"
                      ? "bg-sky-600 border-sky-600 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-200"
                  } hover:bg-sky-600 hover:border-sky-600 hover:text-white transition-colors duration-300`}
                >
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button
                  className={`px-3 py-1.5 rounded-md border ${
                    location.pathname === "/signup"
                      ? "bg-sky-600 border-sky-600 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-200"
                  } hover:bg-sky-600 hover:border-sky-600 hover:text-white transition-colors duration-300`}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
