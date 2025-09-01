import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
})

export const config = {
  matcher: [
    '/articles/new',
    '/articles/:path*/edit',
    '/profile/:path*'
  ]
}