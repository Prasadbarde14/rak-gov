import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = (href) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link to="/" className="text-slate-500 hover:text-slate-700">
        <Home className="h-4 w-4 cursor-pointer" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-slate-400 cursor-pointer" />
          {item.href ? (
            <button
              onClick={() => handleClick(item.href)}
              className="text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
