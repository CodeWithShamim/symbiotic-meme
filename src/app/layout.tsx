import MatrixBackground from '@/components/MatrixBackground'
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Symbiotic Meme Generator',
  description: 'Generate funny Symbiotic memes using your X profile picture',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-black to-primary bg-[length:200%_200%] animate-gradient"></div>

        <MatrixBackground />

        <header className="p-4 text-white text-center font-bold text-3xl">
          Symbiotic Meme Generator
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          {children}
        </main>
        <footer className="p-4 text-center text-white">© 2025 Sham</footer>
      </body>
    </html>
  )
}
