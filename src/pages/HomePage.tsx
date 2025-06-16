import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Typography,
  styled,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { dataService } from '../services/dataService'

const Logo = styled('img')({
  width: '200px',
  height: '200px',
  marginBottom: '2rem',
})

const HomePage = () => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const hasMenuData = dataService.getMenuData() !== null

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      navigate('/analysis', { state: { image: e.target.files[0] } })
    }
  }

  const handleMenuClick = () => {
    if (hasMenuData) {
      navigate('/menu')
    }
  }

  return (
    <>
      {hasMenuData && (
        <AppBar position="fixed" color="default" elevation={1}>
          <Toolbar sx={{ justifyContent: 'flex-start' }}>
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
      )}
      
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            pt: hasMenuData ? 8 : 0, // Add padding top when AppBar is present
          }}
        >
          <Logo src="/logo.png" alt="Menu Translator" />
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
            Menu Translator
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, flexDirection: 'column', width: '100%' }}>
            <Button
              variant="contained"
              component="label"
              size="large"
              startIcon={<CameraAltIcon />}
              sx={{ 
                fontSize: '1.2rem', 
                py: 2,
                background: 'linear-gradient(45deg, #001c3b 30%, #1a3a5c 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #000f1f 30%, #001c3b 90%)',
                }
              }}
            >
              Take Photo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={handleCapture}
              />
            </Button>

            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoLibraryIcon />}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(0, 28, 59, 0.04)',
                },
              }}
            >
              Choose from Gallery
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleCapture}
              />
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default HomePage