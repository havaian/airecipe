import { IconButton, Tooltip, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { openGoogleImageSearch } from '../utils/googleImageUtils'

interface DishImageButtonProps {
  dishName: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'floating' | 'inline'
}

const DishImageButton = ({ dishName, size = 'medium', variant = 'floating' }: DishImageButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openGoogleImageSearch(dishName)
  }

  const buttonSizes = {
    small: 32,
    medium: 40,
    large: 48,
  }

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24,
  }

  const baseStyles = {
    width: buttonSizes[size],
    height: buttonSizes[size],
    backgroundColor: 'rgba(0, 28, 59, 0.9)',
    color: 'white',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(0, 28, 59, 1)',
      transform: 'scale(1.1)',
      boxShadow: '0px 4px 12px rgba(0, 28, 59, 0.3)',
    },
  }

  const floatingStyles = {
    ...baseStyles,
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    backdropFilter: 'blur(4px)',
  }

  const inlineStyles = {
    ...baseStyles,
    position: 'relative',
  }

  return (
    <Tooltip title={`Search images for ${dishName}`} arrow>
      <Box sx={{ display: 'inline-block' }}>
        <IconButton
          onClick={handleClick}
          sx={variant === 'floating' ? floatingStyles : inlineStyles}
        >
          <SearchIcon sx={{ fontSize: iconSizes[size] }} />
        </IconButton>
      </Box>
    </Tooltip>
  )
}

export default DishImageButton