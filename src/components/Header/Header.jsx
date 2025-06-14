import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-[#151521] text-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4 px-4 md:px-8 relative">
          {/* Logo */}
          <NavLink to="/" className="mr-4">
            <Logo width="70px" />
          </NavLink>

          {/* Hamburger (only visible on mobile) */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>

          {/* Navigation Items */}
          <ul
            className={`absolute md:static left-0 top-full w-full md:w-auto bg-[#151521] md:bg-transparent flex flex-col md:flex-row items-start md:items-center gap-3 px-4 md:px-0 transition-all duration-300 ease-in-out z-50 ${
              isOpen ? "flex m-3" : "hidden md:flex m-3 "
            }`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="w-full md:w-auto">
                    <NavLink
                      to={item.slug}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-5 py-2 text-sm font-medium rounded-full transition duration-200 m-3 ${
                          isActive
                            ? "bg-purple-700 text-white m-3"
                            : "hover:bg-purple-600 m-3"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <li className="w-full md:w-auto">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
