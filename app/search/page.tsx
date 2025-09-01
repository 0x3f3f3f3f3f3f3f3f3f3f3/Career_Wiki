import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import {
  Container,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  Divider,
  InputAdornment
} from '@mui/material'
import {
  Search as SearchIcon,
  Description as FileTextIcon
} from '@mui/icons-material'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

async function searchArticles(query: string) {
  if (!query) return []
  
  return await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { summary: { contains: query } },
        { content: { contains: query } }
      ]
    },
    include: { author: true },
    take: 20
  })
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''
  const articles = await searchArticles(query)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 6,
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        搜索结果
      </Typography>
      
      <Card variant="glass" padding="lg" sx={{ mb: 6 }}>
        <CardContent>
          <Box component="form" action="/search" method="get" sx={{ display: 'flex', gap: 2 }}>
            <TextField
              name="q"
              defaultValue={query}
              placeholder="输入搜索关键词..."
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
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
              sx={{
                px: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                whiteSpace: 'nowrap'
              }}
            >
              <SearchIcon sx={{ fontSize: 18 }} />
              搜索
            </Button>
          </Box>
        </CardContent>
      </Card>

      {query && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" color="text.secondary">
            搜索 "{query}" 找到{' '}
            <Badge variant="secondary" size="sm">
              {articles.length}
            </Badge>{' '}
            个结果
          </Typography>
        </Box>
      )}

      {articles.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {articles.map((article, index) => (
            <Card key={article.id} variant="interactive">
              <CardContent>
                <Link 
                  href={`/articles/${article.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      mb: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.dark',
                      },
                    }}
                  >
                    {article.title}
                  </Typography>
                </Link>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {article.summary || article.content.substring(0, 200) + '...'}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Typography variant="caption" color="text.secondary">
                    作者: {article.author.name || article.author.email}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(article.updatedAt).toLocaleDateString('zh-CN')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : query ? (
        <Card variant="glass" sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <FileTextIcon 
              sx={{ 
                fontSize: 48, 
                color: 'text.disabled', 
                mb: 2 
              }} 
            />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              没有找到相关词条
            </Typography>
            <Typography variant="body2" color="text.secondary">
              尝试使用其他关键词搜索
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card variant="glass" sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <SearchIcon 
              sx={{ 
                fontSize: 48, 
                color: 'text.disabled', 
                mb: 2 
              }} 
            />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              输入关键词开始搜索
            </Typography>
            <Typography variant="body2" color="text.secondary">
              搜索词条标题、摘要或内容
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}