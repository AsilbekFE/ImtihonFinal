import React, { useState, useEffect } from 'react';

// Simple Hash Router (react-router-dom o'rniga)
const getPath = () => {
  const hash = window.location.hash.replace('#', '') || '/';
  return hash;
};

export const navigate = (path) => {
  window.location.hash = path;
};

export const useLocation = () => {
  const [pathname, setPathname] = useState(getPath);
  useEffect(() => {
    const onHashChange = () => setPathname(getPath());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return { pathname };
};

export const Link = ({ to, children, className, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
    if (onClick) onClick();
  };
  return (
    <a href={`#${to}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export const Router = ({ children }) => children;

export const Routes = ({ children }) => {
  const { pathname } = useLocation();
  let matched = null;
  React.Children.forEach(children, (child) => {
    if (!matched && child && child.props && child.props.path === pathname) {
      matched = child.props.element;
    }
  });
  if (!matched) {
    React.Children.forEach(children, (child) => {
      if (!matched && child && child.props && child.props.path === '/') {
        matched = child.props.element;
      }
    });
  }
  return matched || null;
};

export const Route = () => null;
