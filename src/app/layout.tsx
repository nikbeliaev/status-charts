import type { Metadata } from 'next'
import { Roboto } from 'next/font/google';
import './globals.css'
import './charts.css'
import 'react-toastify/dist/ReactToastify.css';

const inter = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Charts',
  description: 'Charts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
