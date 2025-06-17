import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Box, 
  CircularProgress, 
  Typography, 
  TextField,
  Button,
  Paper,
  Alert,
  Card,
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { analyzeMenu } from '../services/menuService'
import { dataService } from '../services/dataService'

const API_KEY_STORAGE_KEY = 'openai_api_key'

const MenuAnalysisPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showApiInput, setShowApiInput] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const hasMenuData = dataService.getMenuData() !== null

  useEffect(() => {
    const image = location.state?.image as File
    if (image) {
      const previewUrl = URL.createObjectURL(image)
      setImagePreview(previewUrl)
      
      return () => URL.revokeObjectURL(previewUrl)
    }
  }, [location.state?.image])

  useEffect(() => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY)
    if (storedApiKey) {
      setApiKey(storedApiKey)
      startAnalysis(storedApiKey)
    } else {
      setShowApiInput(true)
    }
  }, [])

  const startAnalysis = async (key: string) => {
    try {
      setIsAnalyzing(true)
      setError(null)
      const image = location.state?.image
      
      if (!image) {
        throw new Error('No image provided')
      }

      const menuData = await analyzeMenu(image, key)
      localStorage.setItem(API_KEY_STORAGE_KEY, key)
      await dataService.setMenuData(menuData, image)
      navigate('/menu')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      if (errorMessage.includes('API key')) {
        setShowApiInput(true)
        localStorage.removeItem(API_KEY_STORAGE_KEY)
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      startAnalysis(apiKey.trim())
    }
  }

  const handleMenuClick = () => {
    if (hasMenuData) {
      navigate('/menu')
    }
  }

  if (!location.state?.image) {
    navigate('/')
    return null
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
                  backgroundColor: 'rgba(0, 146, 70, 0.04)',
                }
              }}
              title="View Recipes"
            >
              <RestaurantMenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          gap: 4,
          pt: hasMenuData ? 10 : 2,
          backgroundColor: 'white',
        }}
      >
        {showApiInput ? (
          <Paper 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ p: 3, width: '100%', maxWidth: 400 }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Enter OpenAI API Key
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your API key will be stored locally for future use
            </Typography>
            <TextField
              fullWidth
              label="API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
            <Button 
              fullWidth 
              variant="contained" 
              type="submit"
              disabled={!apiKey.trim() || isAnalyzing}
              sx={{
                background: 'linear-gradient(45deg, #009246 30%, #4CAF50 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #006B33 30%, #009246 90%)',
                }
              }}
            >
              {isAnalyzing ? 'Analyzing fridge...' : 'Analyze Fridge Contents'}
            </Button>
          </Paper>
        ) : isAnalyzing ? (
          <>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress 
                size={80} 
                thickness={4}
                sx={{ 
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '50%',
                  p: 1
                }} 
              />
              <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
                Finding delicious recipes you can make!
              </Typography>
            </Box>
            {imagePreview && (
              <Card 
                sx={{ 
                  maxWidth: 400, 
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={imagePreview}
                  alt="Fridge contents preview"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '60vh',
                    objectFit: 'contain',
                  }}
                />
              </Card>
            )}
          </>
        ) : error ? (
          <Alert 
            severity="error" 
            action={
              <Button 
                color="inherit" 
                size="small"
                onClick={() => {
                  setError(null)
                  setShowApiInput(true)
                }}
              >
                Try Again
              </Button>
            }
          >
            {error}
          </Alert>
        ) : null}
      </Box>
    </>
  )
}

export default MenuAnalysisPage