'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import {
  Container,
  Box,
  Typography,
  TextField,
  Alert,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import {
  Email as MailIcon,
  Lock as LockIcon,
  Person as UserIcon,
  AutoFixHigh as SparklesIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    if (password.length < 6) {
      setError('密码长度至少为6位')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '注册失败')
      } else {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false
        })

        if (result?.ok) {
          router.push('/')
          router.refresh()
        }
      }
    } catch (error) {
      setError('注册失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(147, 51, 234, 0.1) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)',
              borderRadius: 3,
              boxShadow: '0 10px 15px rgba(59, 130, 246, 0.3)',
              mb: 3
            }}
          >
            <SparklesIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            加入我们
          </Typography>
          <Typography variant="body1" color="text.secondary">
            创建账号，开始您的知识分享之旅
          </Typography>
        </Box>

        <Card variant="glass" padding="xl">
          <CardContent>
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <TextField
                label="用户名"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="输入您的用户名"
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UserIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 600,
                  },
                }}
              />

              <TextField
                label="邮箱地址"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入您的邮箱地址"
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 600,
                  },
                }}
              />

              <TextField
                label="密码"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="设置您的密码（至少6位）"
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 600,
                  },
                }}
              />

              <TextField
                label="确认密码"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入密码"
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontWeight: 600,
                  },
                }}
              />

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                size="lg"
                sx={{
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={18} color="inherit" />
                    创建账号中...
                  </>
                ) : (
                  <>
                    创建账号
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                  </>
                )}
              </Button>
            </Box>

            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                已有账号？
                <Link
                  href="/auth/signin"
                  style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: 600,
                    marginLeft: '4px',
                    transition: 'color 0.2s ease'
                  }}
                >
                  立即登录
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}