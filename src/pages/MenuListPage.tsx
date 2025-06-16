import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Paper,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import PhotoIcon from '@mui/icons-material/Photo'
import { dataService } from '../services/dataService'
import DishImageButton from '../components/DishImageButton'

interface MenuItem {
  name: string
  price: string
  description: string
  ingredients: string[]
  allergens: string[]
  imageUrls?: string[]
}

interface MenuCategory {
  name: string
  items: MenuItem[]
}

interface MenuData {
  categories: MenuCategory[]
  timestamp: number
  originalImage?: string
}

const MenuListPage = () => {
  const navigate = useNavigate()
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [showOriginalImage, setShowOriginalImage] = useState(false)

  useEffect(() => {
    const data = dataService.getMenuData()
    if (!data) {
      navigate('/')
      return
    }
    setMenuData(data)
  }, [navigate])

  const handleItemClick = (item: MenuItem) => {
    navigate(`/dish/${encodeURIComponent(item.name)}`, { state: { item } })
  }

  if (!menuData) return null

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantMenuIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Menu
            </Typography>
            {menuData.originalImage && (
              <IconButton
                onClick={() => setShowOriginalImage(!showOriginalImage)}
                sx={{
                  ml: 1,
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 28, 59, 0.04)',
                  }
                }}
                title="Toggle original menu image"
              >
                <PhotoIcon />
              </IconButton>
            )}
          </Box>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(45deg, #001c3b 30%, #1a3a5c 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #000f1f 30%, #001c3b 90%)',
              }
            }}
          >
            New Search
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {showOriginalImage && menuData.originalImage && (
          <Paper sx={{ p: 2, mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              Original Menu
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              '& img': {
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 28, 59, 0.1)'
              }
            }}>
              <img 
                src={menuData.originalImage} 
                alt="Original menu" 
              />
            </Box>
          </Paper>
        )}

        {menuData.categories.map((category) => (
          <Box key={category.name} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
              {category.name}
            </Typography>
            <Grid container spacing={2}>
              {category.items.map((item, index) => (
                <Grid item xs={12} sm={6} key={`${category.name}-${item.name}-${index}`}>
                  <Card 
                    onClick={() => handleItemClick(item)}
                    sx={{ 
                      cursor: 'pointer',
                      aspectRatio: '1/1',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0px 8px 25px rgba(0, 28, 59, 0.15)',
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', height: '75%' }}>
                      <CardMedia
                        component="img"
                        image={item.imageUrls?.[0] || '/placeholder.png'}
                        alt=""
                        sx={{
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <DishImageButton 
                        dishName={item.name} 
                        variant="floating" 
                        size="small" 
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" noWrap sx={{ color: 'primary.main' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                        Price: {item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </>
  )
}

export default MenuListPage