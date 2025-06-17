/**
 * Utility functions for difficulty-based styling
 */

export interface DifficultyStyle {
  color: string
  backgroundColor: string
  borderColor?: string
}

/**
 * Gets the color styling for a difficulty level
 * @param difficulty - The difficulty level (Easy, Medium, Hard)
 * @returns Style object with colors
 */
export const getDifficultyStyle = (difficulty: string): DifficultyStyle => {
  const normalizedDifficulty = difficulty.toLowerCase().trim()
  
  switch (normalizedDifficulty) {
    case 'easy':
      return {
        color: '#2E7D32', // Dark green
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        borderColor: 'rgba(46, 125, 50, 0.3)'
      }
    case 'medium':
      return {
        color: '#F57C00', // Orange
        backgroundColor: 'rgba(245, 124, 0, 0.1)',
        borderColor: 'rgba(245, 124, 0, 0.3)'
      }
    case 'hard':
      return {
        color: '#D32F2F', // Red
        backgroundColor: 'rgba(211, 47, 47, 0.1)',
        borderColor: 'rgba(211, 47, 47, 0.3)'
      }
    default:
      return {
        color: '#666666', // Gray for unknown difficulties
        backgroundColor: 'rgba(102, 102, 102, 0.1)',
        borderColor: 'rgba(102, 102, 102, 0.3)'
      }
  }
}

/**
 * Gets just the text color for a difficulty level
 * @param difficulty - The difficulty level
 * @returns Color string
 */
export const getDifficultyColor = (difficulty: string): string => {
  return getDifficultyStyle(difficulty).color
}