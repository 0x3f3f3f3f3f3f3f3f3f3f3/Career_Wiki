import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b82f6', // blue-500
      light: '#60a5fa', // blue-400
      dark: '#2563eb', // blue-600
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6', // violet-500
      light: '#a78bfa', // violet-400
      dark: '#7c3aed', // violet-600
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: '#1f2937', // gray-800
      secondary: '#6b7280', // gray-500
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #6366f1)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#4b5563',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#6b7280',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 1) 0%, rgba(147, 51, 234, 1) 100%)',
          },
        },
        containedSecondary: {
          background: 'rgba(255, 255, 255, 0.8)',
          color: '#374151',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(12px)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          background: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          color: '#1f2937',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.6)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(59, 130, 246, 0.5)',
            },
          },
        },
      },
    },
  },
});