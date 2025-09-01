import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Box, Container, Typography, Grid } from '@mui/material'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

async function getArticles() {
  return await prisma.article.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { author: true }
  })
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 6 
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          所有词条
        </Typography>
        <Button
          component={Link}
          href="/articles/new"
          variant="primary"
          sx={{ fontWeight: 600 }}
        >
          创建新词条
        </Button>
      </Box>

      {articles.length > 0 ? (
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item xs={12} md={6} key={article.id}>
              <Card 
                variant="interactive"
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Link 
                    href={`/articles/${article.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <CardTitle 
                      sx={{ 
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.dark'
                        },
                        mb: 2
                      }}
                    >
                      {article.title}
                    </CardTitle>
                  </Link>
                  <CardDescription 
                    sx={{ 
                      mb: 3,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '4.5rem'
                    }}
                  >
                    {article.summary || '暂无摘要'}
                  </CardDescription>
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
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card variant="glass" sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ mb: 3 }}
            >
              暂无词条
            </Typography>
            <Button
              component={Link}
              href="/articles/new"
              variant="primary"
            >
              创建第一个词条
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}