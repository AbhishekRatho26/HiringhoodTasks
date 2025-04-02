import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types/recipe';

interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [
    {
      id: '1',
      title: 'Classic Margherita Pizza',
      description: 'Traditional Italian pizza with fresh basil and mozzarella',
      imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
      ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
      instructions: [
        'Preheat oven to 450°F',
        'Roll out the pizza dough',
        'Spread tomato sauce',
        'Add mozzarella',
        'Bake for 12-15 minutes',
        'Top with fresh basil'
      ]
    }
  ]
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
    }
  }
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;