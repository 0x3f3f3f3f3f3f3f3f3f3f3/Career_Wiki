import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Avatar,
} from '@mui/material'
import { 
  AutoStories as BookIcon, 
  TrendingUp, 
  AccessTime as ClockIcon, 
  AutoAwesome as SparklesIcon, 
  ArrowForward as ArrowRightIcon, 
  Star, 
  People as UsersIcon, 
  Bolt as ZapIcon, 
  Public as GlobeIcon, 
  Security as ShieldIcon, 
  Lightbulb 
} from '@mui/icons-material'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

async function getRecentArticles() {
  return await prisma.article.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  })
}

export default async function HomePage() {
  const recentArticles = await getRecentArticles()

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: 12,
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Q0EzQUYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=")`,
            opacity: 0.4,
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Main Headline */}
            <Box sx={{ maxWidth: '5xl', mx: 'auto', mb: 8 }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' },
                  fontWeight: 700,
                  mb: 3,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 1,
                  }}
                >
                  知识的力量
                </Box>
                <Box component="span" sx={{ display: 'block', color: 'text.primary' }}>
                  触手可及
                </Box>
              </Typography>
              
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                  color: 'text.secondary',
                  mb: 6,
                  maxWidth: '4xl',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                一个开放的知识共享平台，让每个人都能轻松创建、编辑和分享知识词条。
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    mt: 1,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    color: 'text.disabled',
                  }}
                >
                  构建人类知识的数字化桥梁
                </Box>
              </Typography>
            </Box>
            
            {/* CTA Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 'lg',
                mx: 'auto',
                mb: 8,
              }}
            >
              <Button
                component={Link}
                href="/articles/new"
                size="lg"
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  fontSize: '1.125rem',
                  px: 5,
                  py: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <SparklesIcon sx={{ fontSize: 24 }} />
                开始创建词条
                <ArrowRightIcon sx={{ fontSize: 24 }} />
              </Button>
              
              <Button
                component={Link}
                href="/articles"
                variant="secondary"
                size="lg"
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  fontSize: '1.125rem',
                  px: 5,
                  py: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <GlobeIcon sx={{ fontSize: 24 }} />
                探索知识库
              </Button>
            </Box>
            
            {/* Trust Indicators */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 4,
                mt: 8,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShieldIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  安全可靠
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <UsersIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  社区驱动
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Lightbulb sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  开源免费
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Badge variant="secondary" size="lg" label="核心特性" sx={{ mb: 3 }} />
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.5rem', lg: '3rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
              }}
            >
              为什么选择 Wiki App
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontSize: { xs: '1.25rem', lg: '1.5rem' },
                color: 'text.secondary',
                maxWidth: '3xl',
                mx: 'auto',
              }}
            >
              强大的功能和优雅的设计，让知识分享变得简单高效
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} lg={4}>
              <Card variant="interactive" padding="lg">
                <CardHeader>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 25px 50px rgba(59, 130, 246, 0.25)',
                    }}
                  >
                    <BookIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <CardTitle variant="h4" sx={{ fontSize: '1.5rem', mb: 2 }}>
                    丰富的内容
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    探索各种主题的词条，从科学技术到人文艺术，应有尽有。每个词条都经过精心编辑，确保内容的准确性和可读性。
                  </CardDescription>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card variant="interactive" padding="lg">
                <CardHeader>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 25px 50px rgba(16, 185, 129, 0.25)',
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <CardTitle variant="h4" sx={{ fontSize: '1.5rem', mb: 2 }}>
                    实时协作
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    社区成员可以实时编辑和更新词条内容，保持信息的时效性。支持 Markdown 语法，让编辑体验更加流畅。
                  </CardDescription>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card variant="interactive" padding="lg">
                <CardHeader>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      boxShadow: '0 25px 50px rgba(139, 92, 246, 0.25)',
                    }}
                  >
                    <ClockIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <CardTitle variant="h4" sx={{ fontSize: '1.5rem', mb: 2 }}>
                    版本历史
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    完整的版本控制系统，让您可以查看每个词条的编辑历史，了解内容的演变过程，确保知识的传承和发展。
                  </CardDescription>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ textAlign: 'center' }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    mb: 2,
                  }}
                >
                  <Star sx={{ fontSize: 32, color: 'white' }} />
                </Box>
              </Box>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontSize: '3rem', fontWeight: 700, color: 'white', mb: 1 }}
              >
                {recentArticles.length}+
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                精选词条
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    mb: 2,
                  }}
                >
                  <UsersIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
              </Box>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontSize: '3rem', fontWeight: 700, color: 'white', mb: 1 }}
              >
                1000+
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                活跃用户
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    mb: 2,
                  }}
                >
                  <ZapIcon sx={{ fontSize: 32, color: 'white' }} />
                </Box>
              </Box>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontSize: '3rem', fontWeight: 700, color: 'white', mb: 1 }}
              >
                99.9%
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                稳定运行
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Recent Articles Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Badge variant="secondary" size="lg" label="最新内容" sx={{ mb: 3 }} />
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2.5rem', lg: '3rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
              }}
            >
              最新词条
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontSize: { xs: '1.25rem', lg: '1.5rem' },
                color: 'text.secondary',
              }}
            >
              发现社区成员分享的最新知识内容
            </Typography>
          </Box>

          {recentArticles.length > 0 ? (
            <>
              <Grid container spacing={4}>
                {recentArticles.map((article, index) => (
                  <Grid item xs={12} sm={6} xl={3} key={article.id}>
                    <Card
                      variant="interactive"
                      padding="md"
                      component={Link}
                      href={`/articles/${article.slug}`}
                      sx={{ 
                        textDecoration: 'none',
                        display: 'block',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                    >
                      <CardHeader>
                        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mb: 2 }}>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
                              borderRadius: 4,
                              fontSize: '1.25rem',
                              fontWeight: 700,
                              color: 'white',
                              boxShadow: '0 10px 15px rgba(96, 165, 250, 0.2)',
                            }}
                          >
                            {article.title.charAt(0).toUpperCase()}
                          </Avatar>
                          <Badge variant="secondary" size="sm" label={`#${index + 1}`} />
                        </Box>
                        <CardTitle
                          variant="h6"
                          sx={{
                            fontSize: '1.125rem',
                            lineHeight: 1.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription
                          sx={{
                            fontSize: '0.875rem',
                            mb: 3,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {article.summary || article.content.substring(0, 100) + '...'}
                        </CardDescription>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            pt: 2,
                            borderTop: '1px solid',
                            borderColor: 'grey.200',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                              }}
                            >
                              {(article.author.name || article.author.email)?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {article.author.name || article.author.email?.split('@')[0]}
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            color="text.disabled"
                            sx={{ flexShrink: 0 }}
                          >
                            {new Date(article.createdAt).toLocaleDateString('zh-CN', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Button
                  component={Link}
                  href="/articles"
                  variant="secondary"
                  size="lg"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mx: 'auto',
                  }}
                >
                  查看所有词条
                  <ArrowRightIcon sx={{ fontSize: 20 }} />
                </Button>
              </Box>
            </>
          ) : (
            <Card
              variant="gradient"
              padding="xl"
              sx={{
                textAlign: 'center',
                maxWidth: '2xl',
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  width: 96,
                  height: 96,
                  background: 'linear-gradient(135deg, rgba(156, 163, 175, 0.2) 0%, rgba(156, 163, 175, 0.3) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                }}
              >
                <BookIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
              </Box>
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 3,
                }}
              >
                还没有词条
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  fontSize: '1.25rem',
                  color: 'text.secondary',
                  mb: 5,
                  lineHeight: 1.6,
                }}
              >
                成为第一个贡献者，创建这个平台的第一个词条，分享您的知识和见解。
              </Typography>
              <Button
                component={Link}
                href="/articles/new"
                size="lg"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mx: 'auto',
                }}
              >
                <SparklesIcon sx={{ fontSize: 20 }} />
                创建第一个词条
              </Button>
            </Card>
          )}
        </Container>
      </Box>
    </Box>
  )
}