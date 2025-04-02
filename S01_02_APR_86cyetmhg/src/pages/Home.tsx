import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import { RootState } from '../store/store';
import { toggleFavorite, setSearchQuery } from '../store/recipeSlice';

function Home() {
  const dispatch = useDispatch();
  const { recipes, favorites, searchQuery } = useSelector((state: RootState) => state.recipes);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFavoriteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    dispatch(toggleFavorite(id));
  };

  return (
    <div>
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="search-input"
        />
      </div>

      <h1 className="page-title">My Recipes</h1>
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="recipe-card"
          >
            <div className="recipe-image-container">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="recipe-image"
              />
              <button
                className={`favorite-button ${favorites.includes(recipe.id) ? 'active' : ''}`}
                onClick={(e) => handleFavoriteClick(e, recipe.id)}
              >
                <Heart
                  size={20}
                  fill={favorites.includes(recipe.id) ? 'var(--danger-color)' : 'none'}
                />
              </button>
            </div>
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