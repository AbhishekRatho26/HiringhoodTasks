import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { RootState } from '../store/store';
import { deleteRecipe } from '../store/recipeSlice';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const recipe = useSelector((state: RootState) =>
    state.recipes.recipes.find(r => r.id === id)
  );

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(id!));
    navigate('/');
  };

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h1 className="page-title">{recipe.title}</h1>
        <div className="button-group">
          <button
            onClick={() => navigate(`/edit-recipe/${id}`)}
            className="button button-primary"
          >
            <Pencil size={20} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="button button-danger"
          >
            <Trash2 size={20} />
            Delete
          </button>
        </div>
      </div>

      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="detail-image"
      />

      <div className="recipe-grid-layout">
        <div>
          <h2 className="recipe-title">Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="recipe-title">Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;