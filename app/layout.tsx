import './globals.css'
import { Inter } from 'next/font/google'
import AuthContext from './context/auth-context'

const font = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Netflix Clone',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
