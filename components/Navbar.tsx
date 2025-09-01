'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  InputBase, 
  Avatar, 
  Menu, 
  MenuItem, 
  Typography, 
  Fade,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { 
  Search as SearchIcon, 
  Add as PlusIcon, 
  Person as UserIcon, 
  Logout as LogoutIcon, 
  AutoStories as BookIcon, 
  Home as HomeIcon 
} from '@mui/icons-material'
import { Button } from '@/components/ui/Button'

export default function Navbar() {
  const { data: session } = useSession()
  const [searchFocused, setSearchFocused] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    handleUserMenuClose()
    signOut()
  }

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4, py: 1, minHeight: '64px !important' }}>
        {/* Left Section - Logo/Home */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Button
            component={Link}
            href="/"
            variant="ghost"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1,
              fontSize: '1rem',
              fontWeight: 600,
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                '& .home-icon': {
                  transform: 'scale(1.1)',
                },
                '& .home-text': {
                  transform: 'scale(1.05)',
                },
              },
            }}
          >
            <HomeIcon 
              className="home-icon"
              sx={{ 
                fontSize: 24, 
                transition: 'transform 0.3s ease' 
              }} 
            />
            <Typography 
              className="home-text"
              variant="h6" 
              sx={{ 
                transition: 'transform 0.3s ease',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              首页
            </Typography>
          </Button>
        </Box>

        {/* Center - Empty space for centered layout */}
        <Box sx={{ flex: 1 }} />

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Search */}
          {!isMobile && (
            <Box
              component="form"
              action="/search"
              method="get"
              sx={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 4,
                width: searchFocused ? 320 : 256,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.6)',
                },
                '&:focus-within': {
                  background: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(59, 130, 246, 0.5)',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                },
              }}
            >
              <SearchIcon
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: searchFocused ? 'primary.main' : 'text.secondary',
                  transition: 'color 0.2s ease',
                }}
              />
              <InputBase
                name="q"
                placeholder="搜索词条..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                sx={{
                  pl: 6,
                  pr: 2,
                  py: 1.5,
                  width: '100%',
                  '& input': {
                    fontSize: '1rem',
                    '&::placeholder': {
                      color: 'text.secondary',
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          )}

          {/* Navigation buttons */}
          <Button
            component={Link}
            href="/articles"
            variant="ghost"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1,
              fontSize: '0.9rem',
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
                '& .book-icon': {
                  transform: 'scale(1.1)',
                },
                '& .book-text': {
                  transform: 'scale(1.05)',
                },
              },
            }}
          >
            <BookIcon 
              className="book-icon"
              sx={{ 
                fontSize: 20, 
                transition: 'transform 0.3s ease' 
              }} 
            />
            <Typography 
              className="book-text"
              sx={{ 
                transition: 'transform 0.3s ease',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              词条页面
            </Typography>
          </Button>

          {session && (
            <Button
              component={Link}
              href="/articles/new"
              variant="primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1,
                fontSize: '0.9rem',
                '&:hover': {
                  '& .plus-icon': {
                    transform: 'scale(1.1) rotate(90deg)',
                  },
                  '& .plus-text': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              <PlusIcon 
                className="plus-icon"
                sx={{ 
                  fontSize: 20, 
                  transition: 'transform 0.3s ease' 
                }} 
              />
              <Typography 
                className="plus-text"
                sx={{ 
                  transition: 'transform 0.3s ease',
                  fontWeight: 600,
                  color: 'inherit',
                  fontSize: '0.9rem'
                }}
              >
                创建词条
              </Typography>
            </Button>
          )}

          {/* User Section */}
          {session ? (
            <>
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{
                  p: 1,
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 1) 0%, rgba(147, 51, 234, 1) 100%)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Avatar
                  src={session.user?.image || undefined}
                  sx={{ width: 40, height: 40 }}
                >
                  {!session.user?.image && <UserIcon />}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                TransitionComponent={Fade}
                sx={{
                  '& .MuiPaper-root': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 1,
                    mt: 1,
                    minWidth: 200,
                  },
                }}
              >
                <MenuItem 
                  component={Link} 
                  href="/profile" 
                  onClick={handleUserMenuClose}
                  sx={{ 
                    py: 1.5, 
                    px: 2,
                    '&:hover': {
                      background: 'rgba(59, 130, 246, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {session.user?.name || '用户'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {session.user?.email}
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem 
                  onClick={handleSignOut}
                  sx={{ 
                    py: 1.5, 
                    px: 2, 
                    color: 'error.main',
                    '&:hover': {
                      background: 'rgba(239, 68, 68, 0.1)',
                    },
                  }}
                >
                  <LogoutIcon sx={{ mr: 2 }} />
                  退出登录
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                href="/auth/signin"
                variant="ghost"
                sx={{ 
                  fontWeight: 600,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                登录
              </Button>
              <Button
                component={Link}
                href="/auth/signup"
                variant="primary"
                sx={{ fontWeight: 600 }}
              >
                开始使用
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}