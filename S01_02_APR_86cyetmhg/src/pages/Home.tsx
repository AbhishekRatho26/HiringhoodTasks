import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';

function Home() {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  return (
    <div>
      <h1 className="page-title">My Recipes</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="recipe-card"
          >
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="recipe-image"
            />
            <div className="recipe-content">
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-description">{recipe.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;