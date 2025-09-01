import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: params.slug },
      include: { author: true }
    })

    if (!article) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
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

    const article = await prisma.article.findUnique({
      where: { slug: params.slug }
    })

    if (!article) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      )
    }

    const lastVersion = await prisma.articleVersion.findFirst({
      where: { articleId: article.id },
      orderBy: { version: 'desc' }
    })

    const updatedArticle = await prisma.article.update({
      where: { slug: params.slug },
      data: {
        title,
        content,
        summary
      }
    })

    await prisma.articleVersion.create({
      data: {
        articleId: article.id,
        title,
        content,
        summary,
        version: (lastVersion?.version || 0) + 1,
        authorId: session.user.id
      }
    })

    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error('Update article error:', error)
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      )
    }

    const article = await prisma.article.findUnique({
      where: { slug: params.slug }
    })

    if (!article) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      )
    }

    await prisma.article.delete({
      where: { slug: params.slug }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    )
  }
}