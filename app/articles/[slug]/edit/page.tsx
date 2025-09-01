'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import {
  Container,
  Box,
  Typography,
  TextField,
  Alert,
  Grid,
  CircularProgress,
  Divider,
  Paper
} from '@mui/material'
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AutoFixHigh as SparklesIcon
} from '@mui/icons-material'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
)

export default function EditArticlePage({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    fetch(`/api/articles/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title)
        setContent(data.content)
        setSummary(data.summary || '')
      })
      .catch(() => setError('加载失败'))
  }, [params.slug])

  if (!session) {
    return (
      <Container 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '80vh' 
        }}
      >
        <Card variant="glass" sx={{ textAlign: 'center', py: 6, px: 4 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              请先登录以编辑词条
            </Typography>
            <Button
              variant="primary"
              onClick={() => router.push('/auth/signin')}
            >
              前往登录
            </Button>
          </CardContent>
        </Card>
      </Container>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`/api/articles/${params.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, summary })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '更新失败')
      } else {
        router.push(`/articles/${params.slug}`)
      }
    } catch (error) {
      setError('更新失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px rgba(59, 130, 246, 0.2)'
            }}
          >
            <EditIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                fontSize: { xs: '1.8rem', md: '2.2rem' }
              }}
            >
              编辑词条
            </Typography>
            <Typography variant="body1" color="text.secondary">
              更新您的知识内容，持续改进文档质量
            </Typography>
          </Box>
        </Box>
      </Box>

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

      <Card variant="glass" padding="xl">
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="词条标题"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="输入词条标题..."
                  required
                  fullWidth
                  variant="outlined"
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
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  简洁明确的标题有助于其他用户找到您的词条
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="词条摘要"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="简要描述词条内容..."
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
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
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  摘要将显示在搜索结果和词条列表中
                </Typography>
              </Grid>
            </Grid>

            <Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                词条内容
                <Typography component="span" sx={{ color: 'error.main' }}>*</Typography>
              </Typography>
              <Paper
                sx={{
                  borderRadius: 1,
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  height={500}
                  data-color-mode="light"
                />
              </Paper>
              <Box sx={{ 
                mt: 2, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3,
                flexWrap: 'wrap'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SparklesIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    支持 Markdown 语法
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">•</Typography>
                <Typography variant="caption" color="text.secondary">实时预览</Typography>
                <Typography variant="caption" color="text.secondary">•</Typography>
                <Typography variant="caption" color="text.secondary">支持表格、代码、链接等</Typography>
              </Box>
            </Box>

            <Box>
              <Divider sx={{ mb: 4 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  作者：{session.user?.name || session.user?.email}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <CancelIcon sx={{ fontSize: 18 }} />
                    取消
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={18} color="inherit" />
                        保存中...
                      </>
                    ) : (
                      <>
                        <SaveIcon sx={{ fontSize: 18 }} />
                        保存更改
                      </>
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}