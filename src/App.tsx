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
      main: '#001c3b', // Navy blue
      light: '#1a3a5c',
      dark: '#000f1f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#d6af61', // Golden yellow
      light: '#e4c584',
      dark: '#b8943e',
      contrastText: '#000',
    },
    background: {
      default: '#F5F5F5',
      paper: '#fff',
    },
    error: {
      main: '#FF5252',
    },
    warning: {
      main: '#d6af61', // Use golden yellow for warnings
      light: '#e4c584',
      dark: '#b8943e',
      contrastText: '#000',
    },
    success: {
      main: '#4CAF50',
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
      textTransform: 'none', // Prevents all-caps buttons
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
            boxShadow: '0px 4px 8px rgba(0, 28, 59, 0.2)',
          },
        },
        outlined: {
          borderColor: '#001c3b',
          color: '#001c3b',
          '&:hover': {
            borderColor: '#1a3a5c',
            backgroundColor: 'rgba(0, 28, 59, 0.04)',
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
            boxShadow: '0px 8px 25px rgba(0, 28, 59, 0.15)',
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
            backgroundColor: 'rgba(214, 175, 97, 0.15)',
            color: '#b8943e',
            border: '1px solid rgba(214, 175, 97, 0.3)',
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
              borderColor: '#001c3b',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#001c3b',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#001c3b',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#001c3b',
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