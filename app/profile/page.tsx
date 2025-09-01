import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
  Container,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  Divider
} from '@mui/material'
import {
  Person as UserIcon,
  Email as MailIcon,
  Description as FileTextIcon
} from '@mui/icons-material'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

async function getUserArticles(userId: string) {
  return await prisma.article.findMany({
    where: { authorId: userId },
    orderBy: { updatedAt: 'desc' }
  })
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const articles = await getUserArticles(session.user.id)

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
        个人资料
      </Typography>

      <Card variant="glass" padding="xl" sx={{ mb: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Avatar
              src={session.user.image || undefined}
              sx={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)',
                fontSize: 32
              }}
            >
              {!session.user.image && <UserIcon sx={{ fontSize: 40 }} />}
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                {session.user.name || '未设置用户名'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body1" color="text.secondary">
                  {session.user.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card variant="glass" padding="xl">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <FileTextIcon sx={{ fontSize: 24, color: 'primary.main' }} />
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              我的词条
            </Typography>
            <Badge variant="secondary" size="sm">
              {articles.length}
            </Badge>
          </Box>

          {articles.length > 0 ? (
            <List sx={{ p: 0 }}>
              {articles.map((article, index) => (
                <Box key={article.id}>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemButton
                      component={Link}
                      href={`/articles/${article.slug}`}
                      sx={{
                        borderRadius: 2,
                        p: 3,
                        background: 'rgba(255, 255, 255, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                            mb: 1,
                            '&:hover': {
                              color: 'primary.dark',
                            },
                          }}
                        >
                          {article.title}
                        </Typography>
                        {article.summary && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2, lineHeight: 1.5 }}
                          >
                            {article.summary}
                          </Typography>
                        )}
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          更新于 {new Date(article.updatedAt).toLocaleDateString('zh-CN')}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                  {index < articles.length - 1 && (
                    <Divider sx={{ my: 2, opacity: 0.3 }} />
                  )}
                </Box>
              ))}
            </List>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                您还没有创建任何词条
              </Typography>
              <Typography variant="body2" color="text.secondary">
                开始分享您的知识，创建第一个词条吧！
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}