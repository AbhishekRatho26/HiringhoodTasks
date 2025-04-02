import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, X } from 'lucide-react';
import { RootState } from '../store/store';
import { addRecipe, updateRecipe } from '../store/recipeSlice';
import { Recipe } from '../types/recipe';

function RecipeForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const existingRecipe = useSelector((state: RootState) =>
    state.recipes.recipes.find(r => r.id === id)
  );

  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  const [formData, setFormData] = useState<Omit<Recipe, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    ingredients: [''],
    instructions: ['']
  });

  const [errors, setErrors] = useState({
    title: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (existingRecipe) {
      setFormData(existingRecipe);
    }
  }, [existingRecipe]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      imageUrl: ''
    };

    // Check for unique title
    const titleExists = recipes.some(recipe => 
      recipe.title.toLowerCase() === formData.title.toLowerCase() && 
      recipe.id !== id
    );
    if (titleExists) {
      newErrors.title = 'A recipe with this title already exists';
      isValid = false;
    }

    // Validate image URL
    try {
      new URL(formData.imageUrl);
    } catch (e) {
      newErrors.imageUrl = 'Please enter a valid URL';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (id) {
      dispatch(updateRecipe({ ...formData, id }));
    } else {
      dispatch(addRecipe({
        ...formData,
        id: Date.now().toString()
      }));
    }
    
    navigate('/');
  };

  const handleArrayInput = (
    index: number,
    value: string,
    field: 'ingredients' | 'instructions'
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (index: number, field: 'ingredients' | 'instructions') => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="page-title">
        {id ? 'Edit Recipe' : 'Add New Recipe'}
      </h1>

      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`form-input ${errors.title ? 'error' : ''}`}
          required
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-input"
          rows={3}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className={`form-input ${errors.imageUrl ? 'error' : ''}`}
          required
        />
        {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="input-group">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleArrayInput(index, e.target.value, 'ingredients')}
              className="form-input"
              required
            />
            {formData.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'ingredients')}
                className="remove-button"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('ingredients')}
          className="add-button"
        >
          <Plus size={20} />
          Add Ingredient
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">Instructions</label>
        {formData.instructions.map((instruction, index) => (
          <div key={index} className="input-group">
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleArrayInput(index, e.target.value, 'instructions')}
              className="form-input"
              required
            />
            {formData.instructions.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'instructions')}
                className="remove-button"
              >
                <X size={20} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('instructions')}
          className="add-button"
        >
          <Plus size={20} />
          Add Instruction
        </button>
      </div>

      <div className="form-footer">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="button button-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="button button-primary"
        >
          {id ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;