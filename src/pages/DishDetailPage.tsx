import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  ImageList,
  ImageListItem,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import InfoIcon from '@mui/icons-material/Info'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { dataService } from '../services/dataService'
import { MenuItem } from '../services/dataService'
import IngredientChip from '../components/IngredientChip'
import AllergenChip from '../components/AllergenChip'
import DishImageButton from '../components/DishImageButton'
import { openRecipeSearch, openAllergenListWikipedia } from '../utils/googleImageUtils'

const DishDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<MenuItem | null>(null)
  const hasMenuData = dataService.getMenuData() !== null

  useEffect(() => {
    if (!id) {
      navigate('/menu')
      return
    }

    const menuItem = dataService.getMenuItem(decodeURIComponent(id))
    if (!menuItem) {
      navigate('/menu')
      return
    }

    setItem(menuItem)
  }, [id, navigate])

  const handleMenuClick = () => {
    navigate('/menu')
  }

  if (!item) return null

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ 
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(0, 28, 59, 0.04)',
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <IconButton
            onClick={handleMenuClick}
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(0, 28, 59, 0.04)',
              }
            }}
            title="View Menu"
          >
            <RestaurantMenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ py: 2 }}>
          {item.imageUrls && item.imageUrls.length > 0 ? (
            <Box sx={{ maxHeight: 600, overflow: 'auto', position: 'relative' }}>
              <ImageList sx={{ width: '100%' }} cols={3} gap={8}>
                {item.imageUrls.map((img, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={img}
                      alt={`${item.name} ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          ) : null}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3, mb: 2 }}>
            <Typography variant="h4" sx={{ color: 'primary.main', flex: 1 }}>
              {item.name}
            </Typography>
            <DishImageButton dishName={item.name} variant="inline" size="large" />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 600 }}>
              Price: {item.price}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SearchIcon />}
              onClick={() => openRecipeSearch(item.name)}
              sx={{
                borderColor: 'secondary.main',
                color: 'secondary.main',
                '&:hover': {
                  borderColor: 'secondary.dark',
                  backgroundColor: 'rgba(214, 175, 97, 0.04)',
                }
              }}
            >
              Find Recipe
            </Button>
          </Box>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Description
            </Typography>
            <Typography>{item.description}</Typography>
          </Paper>

          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: 'rgba(0, 28, 59, 0.02)',
            border: '1px solid rgba(0, 28, 59, 0.08)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              History
            </Typography>
            <Typography sx={{ 
              lineHeight: 1.8,
              fontStyle: 'italic',
              color: 'text.secondary'
            }}>
              {item.history}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Ingredients
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {item.ingredients.map((ingredient: string) => (
                <IngredientChip key={ingredient} ingredient={ingredient} />
              ))}
            </Box>
          </Paper>

          {item.allergens.length > 0 && (
            <Paper sx={{ 
              p: 3, 
              bgcolor: 'rgba(214, 175, 97, 0.08)',
              border: '1px solid rgba(214, 175, 97, 0.2)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ color: 'primary.main' }}>
                  Allergens
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<InfoIcon />}
                  onClick={openAllergenListWikipedia}
                  sx={{
                    color: 'secondary.main',
                    fontSize: '0.75rem',
                    '&:hover': {
                      backgroundColor: 'rgba(214, 175, 97, 0.04)',
                    }
                  }}
                >
                  View All Allergens
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {item.allergens.map((allergen: string) => (
                  <AllergenChip key={allergen} allergen={allergen} />
                ))}
              </Box>
            </Paper>
          )}
        </Box>
      </Container>
    </>
  )
}

export default DishDetailPage