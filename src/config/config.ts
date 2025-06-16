export const CONFIG = {
  GOOGLE_SEARCH_API_KEY: '',
  GOOGLE_SEARCH_CX: '',
  GOOGLE_SEARCH_ENDPOINT: 'https://www.googleapis.com/customsearch/v1',
  MENU_ANALYSIS_PROMPT: `
    Analyze this fridge contents image and return a JSON with the following structure:
    {
      "categories": [
        {
          "name": "string",
          "items": [
            {
              "name": "string",
              "price": "string",
              "description": "string",
              "ingredients": ["string"],
              "allergens": ["string"],
              "history": "string"
            }
          ]
        }
      ]
    }
    Follow the rules:
    - Analyze the fridge contents and suggest 5-8 delicious recipes that can be made with the visible ingredients
    - Group recipes by category (e.g., "Quick Meals", "Comfort Food", "Healthy Options", "Italian Classics", etc.)
    - For "name": provide creative, appetizing recipe names
    - For "price": indicate difficulty level (Easy, Medium, Hard) instead of actual price
    - For "description": write an enticing description of the dish and cooking method (2-3 sentences)
    - For "ingredients": list the main ingredients needed from what's visible in the fridge, plus common pantry items
    - For "allergens": identify potential allergens in the recipe (dairy, gluten, nuts, etc.)
    - For "history": provide 3-4 interesting sentences about the dish's origin, cultural significance, or cooking tips
    - Be creative and suggest recipes that would realistically use the ingredients shown
    - Focus on practical, home-cookable recipes THAT ACTUALLY EXIST AND CAN BE COOKED - NOTHING UNREALISTIC ABSURD AND STUPID
    - (!) ONLY JSON IS ALLOWED as an answer. No explanation or other text is allowed!
  `
}