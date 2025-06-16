import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import HomePage from './pages/HomePage'
import MenuAnalysisPage from './pages/MenuAnalysisPage'
import MenuListPage from './pages/MenuListPage'
import DishDetailPage from './pages/DishDetailPage'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#009246', // Italian green
      light: '#4CAF50',
      dark: '#006B33',
      contrastText: '#fff',
    },
    secondary: {
      main: '#CE2B37', // Italian red
      light: '#E57373',
      dark: '#B71C1C',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F5',
      paper: '#fff',
    },
    error: {
      main: '#CE2B37', // Use Italian red for errors
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#000',
    },
    success: {
      main: '#009246', // Use Italian green for success
    },
    info: {
      main: '#2196F3',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 146, 70, 0.2)',
          },
        },
        outlined: {
          borderColor: '#009246',
          color: '#009246',
          '&:hover': {
            borderColor: '#006B33',
            backgroundColor: 'rgba(0, 146, 70, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 25px rgba(0, 146, 70, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.MuiChip-colorWarning': {
            backgroundColor: 'rgba(255, 152, 0, 0.15)',
            color: '#F57C00',
            border: '1px solid rgba(255, 152, 0, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#009246',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#009246',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#009246',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#009246',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analysis" element={<MenuAnalysisPage />} />
          <Route path="/menu" element={<MenuListPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App