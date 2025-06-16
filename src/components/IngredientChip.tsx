import { Chip, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { openGoogleImageSearch } from '../utils/googleImageUtils'

interface IngredientChipProps {
  ingredient: string
  variant?: 'default' | 'outlined'
  size?: 'small' | 'medium'
}

const IngredientChip = ({ ingredient, variant = 'default', size = 'medium' }: IngredientChipProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openGoogleImageSearch(ingredient)
  }

  return (
    <Tooltip title={`Search images for ${ingredient}`} arrow>
      <Chip
        label={ingredient}
        onClick={handleClick}
        onDelete={handleClick}
        deleteIcon={<SearchIcon sx={{ fontSize: '16px !important' }} />}
        size={size}
        variant={variant}
        sx={{
          backgroundColor: 'rgba(0, 28, 59, 0.08)',
          color: 'primary.main',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(0, 28, 59, 0.12)',
            transform: 'translateY(-1px)',
            boxShadow: '0px 2px 8px rgba(0, 28, 59, 0.15)',
          },
          '& .MuiChip-deleteIcon': {
            color: 'primary.main',
            '&:hover': {
              color: 'primary.dark',
            },
          },
        }}
      />
    </Tooltip>
  )
}

export default IngredientChip