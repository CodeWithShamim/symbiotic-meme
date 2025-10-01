import MatrixBackground from '@/components/MatrixBackground'
import './globals.css'
import { ReactNode } from 'react'
import Image from 'next/image'

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

        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover -z-10 opacity-20 w-full h-full"
          priority
        />

        <main className="flex-1 flex items-center justify-center p-4">
          {children}
        </main>
        <footer className="p-4 text-center text-white text animate-pulse">
          © 2025 Sham (CodeWithShamim)
        </footer>
      </body>
    </html>
  )
}
