import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

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

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-[#151521] shadow-md py-4 px-4 text-white relative">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="mr-4">
            <Logo width="70px" />
          </NavLink>

          {/* Hamburger button for mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Nav links */}
          <ul
            className={`absolute top-full left-0 w-full md:static md:flex md:items-center md:gap-3 bg-[#151521] md:bg-transparent flex-col md:flex-row transition-all duration-200 ease-in-out z-50 ${
              menuOpen ? "flex" : "hidden md:flex"
            }`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full md:w-auto">
                  <NavLink
                    to={item.slug}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-5 py-2 text-sm font-medium rounded-full transition duration-200 text-center ${
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

            {authStatus && (
              <li className="w-full md:w-auto text-center">
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
