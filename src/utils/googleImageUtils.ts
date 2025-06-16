/**
 * Utility functions for generating Google Image search links and other search URLs
 */

/**
 * Generates a Google Image search URL for a given query
 * @param query - The search term
 * @returns Google Image search URL
 */
export const generateGoogleImageSearchUrl = (query: string): string => {
  const encodedQuery = encodeURIComponent(query.trim())
  return `https://www.google.com/search?udm=2&q=${encodedQuery}`
}

/**
 * Generates a Google recipe search URL for a given dish
 * @param dishName - The dish name to search for recipes
 * @returns Google recipe search URL
 */
export const generateRecipeSearchUrl = (dishName: string): string => {
  const encodedQuery = encodeURIComponent(`${dishName.trim()} recipe`)
  return `http://www.google.com/search?ie=UTF-8&q=${encodedQuery}`
}

/**
 * Generates a Wikipedia URL for a specific allergen
 * @param allergen - The allergen name
 * @returns Wikipedia URL for the allergen
 */
export const generateAllergenWikipediaUrl = (allergen: string): string => {
  const formattedAllergen = allergen.trim().replace(/\s+/g, '_')
  return `https://en.wikipedia.org/wiki/${formattedAllergen}`
}

/**
 * Gets the Wikipedia URL for the list of allergens
 * @returns Wikipedia URL for allergen list
 */
export const getAllergenListWikipediaUrl = (): string => {
  return 'https://en.wikipedia.org/wiki/List_of_allergens'
}

/**
 * Opens a Google Image search in a new tab
 * @param query - The search term
 */
export const openGoogleImageSearch = (query: string): void => {
  const url = generateGoogleImageSearchUrl(query)
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Opens a Google recipe search in a new tab
 * @param dishName - The dish name to search for recipes
 */
export const openRecipeSearch = (dishName: string): void => {
  const url = generateRecipeSearchUrl(dishName)
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Opens a Wikipedia page for an allergen in a new tab
 * @param allergen - The allergen name
 */
export const openAllergenWikipedia = (allergen: string): void => {
  const url = generateAllergenWikipediaUrl(allergen)
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Opens the Wikipedia list of allergens in a new tab
 */
export const openAllergenListWikipedia = (): void => {
  const url = getAllergenListWikipediaUrl()
  window.open(url, '_blank', 'noopener,noreferrer')
}