import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, PlusCircle, Home } from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <ChefHat size={32} />
        <h1 className="sidebar-title">Recipe Book</h1>
      </div>
      
      <nav>
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <Home size={20} />
          <span>Home</span>
        </Link>
        
        <Link to="/add-recipe" className={`nav-link ${isActive('/add-recipe')}`}>
          <PlusCircle size={20} />
          <span>Add Recipe</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;