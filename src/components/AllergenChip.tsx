import { Chip, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { openAllergenWikipedia } from '../utils/googleImageUtils'

interface AllergenChipProps {
  allergen: string
  size?: 'small' | 'medium'
}

const AllergenChip = ({ allergen, size = 'medium' }: AllergenChipProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openAllergenWikipedia(allergen)
  }

  return (
    <Tooltip title={`Learn more about ${allergen} on Wikipedia`} arrow>
      <Chip
        label={allergen}
        onClick={handleClick}
        onDelete={handleClick}
        deleteIcon={<InfoIcon sx={{ fontSize: '16px !important' }} />}
        size={size}
        color="warning"
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 2px 8px rgba(214, 175, 97, 0.3)',
          },
          '& .MuiChip-deleteIcon': {
            color: 'inherit',
            '&:hover': {
              color: 'warning.dark',
            },
          },
        }}
      />
    </Tooltip>
  )
}

export default AllergenChip