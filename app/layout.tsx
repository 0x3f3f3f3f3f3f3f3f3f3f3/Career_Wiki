import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from '@/components/Provider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Navbar from '@/components/Navbar'
import { Box } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wiki App',
  description: '一个类似维基百科的知识共享平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <ThemeProvider>
          <Provider>
            <Box 
              sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 25%, rgba(236, 72, 153, 0.1) 50%, rgba(245, 101, 101, 0.1) 75%, rgba(34, 197, 94, 0.1) 100%)'
              }}
            >
              <Navbar />
              <Box 
                component="main" 
                sx={{ 
                  maxWidth: '1200px', 
                  margin: '0 auto', 
                  px: 4, 
                  py: 8 
                }}
              >
                {children}
              </Box>
            </Box>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}