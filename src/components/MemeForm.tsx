'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function MemeForm() {
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [meme, setMeme] = useState<string | null>(null)

  const fetchProfile = async () => {
    if (!username) return
    setLoading(true)
    setMeme(null)

    // ✅ Get avatar from Twitter
    const url = `https://unavatar.io/x/${username}`
    setAvatar(url)

    // Simulate AI meme generation
    setTimeout(() => {
      setMeme(url) // example template image from /public/memes
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter your X username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-black border-green-500 text-green-400"
        />
        <Button
          onClick={fetchProfile}
          disabled={loading}
          className="bg-green-600 hover:bg-green-500 text-black font-bold"
        >
          {loading ? 'Loading...' : 'Generate Meme'}
        </Button>
      </div>

      {/* Profile Picture */}
      {avatar && (
        <div className="flex justify-center">
          <Image
            src={avatar}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-2 border-green-500 shadow-lg"
          />
        </div>
      )}

      {/* Meme Result */}
      {loading && (
        <div className="text-center text-green-400 animate-pulse">
          ⚡ Generating Meme...
        </div>
      )}

      {meme && avatar && (
        <div className="relative w-full h-80 bg-black border border-green-600 rounded-lg overflow-hidden">
          <Image
            src={meme}
            alt="Meme"
            fill
            className="object-cover opacity-80"
          />
          <Image
            src={avatar}
            alt="Profile overlay"
            width={100}
            height={100}
            className="absolute bottom-4 left-4 rounded-full border-4 border-green-500"
          />
          <p className="absolute bottom-4 right-4 text-green-400 font-bold text-lg">
            #Symbiotic
          </p>
        </div>
      )}
    </div>
  )
}
