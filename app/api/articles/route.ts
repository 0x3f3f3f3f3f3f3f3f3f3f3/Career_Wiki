import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: { author: true },
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      )
    }

    const { title, content, summary } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: '标题和内容是必填项' },
        { status: 400 }
      )
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fa5]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100)

    const existingArticle = await prisma.article.findUnique({
      where: { slug }
    })

    if (existingArticle) {
      return NextResponse.json(
        { error: '该标题已存在' },
        { status: 400 }
      )
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        summary,
        authorId: session.user.id
      }
    })

    await prisma.articleVersion.create({
      data: {
        articleId: article.id,
        title,
        content,
        summary,
        version: 1,
        authorId: session.user.id
      }
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('Create article error:', error)
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}