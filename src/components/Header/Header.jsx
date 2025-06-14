import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-[#151521] shadow-md py-4 px-8 text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="mr-4">
            <Logo width="70px" />
          </NavLink>

          {/* Navigation Items */}
          <ul className="flex items-center gap-3">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `px-5 py-2 text-sm font-medium rounded-full transition duration-200 ${
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

            {/* Logout Button */}
            {authStatus && (
              <li>
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
