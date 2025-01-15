import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/features/authSlice';

export const TopbarComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Access the logged-in user from the Redux store
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()); // Clear user and token from Redux store
    navigate('/'); // Redirect to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top">
      <Link to="/" className="navbar-brand">
        <div className="d-flex flex-row">
          <div className="d-flex flex-column ms-2">
            <div className="text-uppercase lh-1">
              <Link to="/dashboard" className="navbar-brand fw-bold fs-4">
                Events
              </Link>
            </div>
          </div>
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'text-white fw-bold link-under' : ''}`
              }
            >
              Events
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'text-white fw-bold link-under' : ''}`
              }
            >
              Employees
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user?.name || user?.email || 'User'} {/* Display user's email */}
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <img
              src={process.env.REACT_APP_DEFAULT_AVATAR || '/default-avatar.png'}
              alt={user?.email || 'User'}
              className="rounded-circle float-md-end"
              style={{ width: '2rem' }}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};
