import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Container,
  Box,
  Typography,
  Chip,
  Divider,
  Avatar
} from '@mui/material'
import {
  Edit as EditIcon,
  Schedule as ClockIcon,
  Person as UserIcon
} from '@mui/icons-material'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: true }
  })

  if (!article) {
    notFound()
  }

  return article
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card variant="glass" padding="xl">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                lineHeight: 1.2,
                flex: 1,
                mr: 3
              }}
            >
              {article.title}
            </Typography>
            <Button
              component={Link}
              href={`/articles/${article.slug}/edit`}
              variant="primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexShrink: 0
              }}
            >
              <EditIcon sx={{ fontSize: 18 }} />
              编辑
            </Button>
          </Box>

          {article.summary && (
            <Card
              variant="glass"
              sx={{
                mb: 4,
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
              }}
              padding="lg"
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  lineHeight: 1.6
                }}
              >
                {article.summary}
              </Typography>
            </Card>
          )}

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4, 
            mb: 4,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)',
                  fontSize: 12
                }}
              >
                <UserIcon sx={{ fontSize: 14 }} />
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                {article.author.name || article.author.email}
              </Typography>
            </Box>
            
            <Chip
              icon={<ClockIcon />}
              label={`创建于 ${new Date(article.createdAt).toLocaleDateString('zh-CN')}`}
              size="small"
              variant="outlined"
              sx={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(8px)',
              }}
            />
            
            {article.updatedAt !== article.createdAt && (
              <Chip
                icon={<ClockIcon />}
                label={`更新于 ${new Date(article.updatedAt).toLocaleDateString('zh-CN')}`}
                size="small"
                variant="outlined"
                sx={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  backdropFilter: 'blur(8px)',
                  color: 'success.main'
                }}
              />
            )}
          </Box>

          <Divider sx={{ mb: 4, opacity: 0.3 }} />

          <Box
            sx={{
              '& .prose': {
                maxWidth: 'none',
                color: 'text.primary',
                fontSize: '1.125rem',
                lineHeight: 1.7,
                
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  color: 'text.primary',
                  fontWeight: 600,
                  marginTop: '2rem',
                  marginBottom: '1rem',
                  lineHeight: 1.3
                },
                
                '& h1': { fontSize: '2rem' },
                '& h2': { fontSize: '1.75rem' },
                '& h3': { fontSize: '1.5rem' },
                '& h4': { fontSize: '1.25rem' },
                
                '& p': {
                  marginBottom: '1.5rem',
                  color: 'text.primary'
                },
                
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.dark',
                    textDecoration: 'underline'
                  }
                },
                
                '& ul, & ol': {
                  marginBottom: '1.5rem',
                  paddingLeft: '2rem'
                },
                
                '& li': {
                  marginBottom: '0.5rem'
                },
                
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  background: 'rgba(59, 130, 246, 0.05)',
                  margin: '2rem 0',
                  padding: '1rem 1.5rem',
                  fontStyle: 'italic',
                  borderRadius: '0 4px 4px 0'
                },
                
                '& code': {
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: 'primary.main',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.9em',
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace'
                },
                
                '& pre': {
                  background: 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  margin: '2rem 0',
                  overflow: 'auto',
                  
                  '& code': {
                    background: 'transparent',
                    color: 'inherit',
                    padding: 0
                  }
                },
                
                '& table': {
                  width: '100%',
                  borderCollapse: 'collapse',
                  margin: '2rem 0',
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  overflow: 'hidden'
                },
                
                '& th, & td': {
                  padding: '1rem',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
                },
                
                '& th': {
                  background: 'rgba(59, 130, 246, 0.1)',
                  fontWeight: 600,
                  color: 'primary.main'
                }
              }
            }}
          >
            <div className="prose prose-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}