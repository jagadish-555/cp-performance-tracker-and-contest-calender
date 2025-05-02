import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // Or adapt this to match actual state

  const navItems = [
    { name: 'Dashboard', slug: '/dashboard', show: authStatus },
    { name: 'Calendar', slug: '/calendar', show: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to={authStatus ? "/dashboard" : "/"}>
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center space-x-4">
            {navItems.map(
              (item) =>
                item.show && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
            {authStatus ? (
              <li>
                <LogoutBtn />
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
