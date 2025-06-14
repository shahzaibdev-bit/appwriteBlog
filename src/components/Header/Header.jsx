import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react"; // Install lucide-react if not yet

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-[#151521] shadow-md py-4 px-4 text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="mr-4">
            <Logo width="70px" />
          </NavLink>

          {/* Hamburger - only visible on mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Nav Links */}
          <ul
            className={`flex flex-col md:flex-row items-start md:items-center gap-3 absolute md:static top-16 left-0 w-full md:w-auto bg-[#151521] px-4 py-6 md:p-0 transition-all duration-300 z-50 ${
              menuOpen ? "block" : "hidden md:flex"
            }`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full md:w-auto">
                  <NavLink
                    to={item.slug}
                    onClick={() => setMenuOpen(false)} // Close menu on click
                    className={({ isActive }) =>
                      `block px-5 py-2 text-sm font-medium rounded-full transition duration-200 w-full ${
                        isActive
                          ? "bg-purple-700 text-white"
                          : "hover:bg-purple-600"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}

            {/* Logout */}
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
