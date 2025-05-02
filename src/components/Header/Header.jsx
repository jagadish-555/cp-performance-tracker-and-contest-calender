import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", slug: "/dashboard", show: authStatus },
    { name: "Calendar", slug: "/calendar", show: authStatus },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Link to={authStatus ? "/dashboard" : "/"}>
              <Logo width="50px" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-3">
            {navItems.map(
              (item) =>
                item.show && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className="text-sm text-gray-700 font-medium px-3 py-1 rounded hover:bg-indigo-100 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 text-xl"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <ul className="flex flex-col md:hidden gap-2 pb-2 px-2">
            {navItems.map(
              (item) =>
                item.show && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className="block text-sm text-gray-700 font-medium px-3 py-1 rounded hover:bg-indigo-100 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
