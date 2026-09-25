import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rodado | Distribuidora mayorista',
  description: 'Catálogo mayorista de llantas para motocicletas en República Dominicana.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#183d2a',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
