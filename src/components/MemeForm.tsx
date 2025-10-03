'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import TwitterShareButton from '@/components/TwitterShareButton'
import { canGenerateMeme, incrementMemeCount } from '@/utils/limit'

export default function MemeForm() {
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [meme, setMeme] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const shareText = 'I just created meme by Symbiotic-meme'
  const hashtags = ['Sybmiotic', 'meme', 'Sham']

  const fetchProfile = async () => {
    if (!username) return
    setLoading(true)
    setMeme(null)
    setError(null)
    setAvatar(null)

    const url = `https://unavatar.io/x/${username}`
    setAvatar(url)

    if (!url) {
      setLoading(false)

      return
    }

    // Check localStorage limit
    if (!canGenerateMeme()) {
      setError('You can only generate 2 memes per day on this browser.')
      return
    }

    const prompt = `Create a funny meme using this profile picture: ${url}. It's a symbiotic.fi crypto project, green-themed items, add "Symbiotic" text.`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    try {
      const res = await fetch('/api/generate-meme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      console.log({ data })

      //   error
      if (data?.error) {
        setError(data?.error?.error || data?.error)
        // setMeme(url)
      }

      const image = data.images[0].url

      console.log({ image })

      setMeme(image)

      incrementMemeCount()

      // if (data.memeUrl) setMeme(data.memeUrl)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // setError(error)
      if (!error) {
        alert('Failed to generate meme')
      }
    } finally {
      setLoading(false)
    }
  }

  const downloadMeme = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `/api/proxy-image?url=${encodeURIComponent(meme as string)}`
      )
      if (!res.ok) throw new Error('Failed to fetch image')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${username + Math.random()}_meme.jpeg`

      link.click()

      // Cleanup
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-full bg-black">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-gradient-to-br from-green-600 via-black to-green-900 border border-green-500">
        <p className="text-green-400 mb-6">
          Enter your X username and create instant memes ⚡
        </p>

        <div className="w-full space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter your X username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black border-white text-green-400"
            />
            <Button
              onClick={fetchProfile}
              disabled={loading}
              className="bg-green-600 hover:bg-green-500 text-white font-bold"
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
            <div className="text-center text-white animate-pulse">
              ⚡ Generating Meme...
            </div>
          )}

          {meme && avatar && (
            <div className="relative w-full h-80 bg-black border border-green-600 rounded-lg overflow-hidden shadow-md">
              <Image
                src={meme}
                alt="Meme"
                fill
                className="object-cover opacity-80"
              />

              <Image
                src={'/logo.png'}
                alt="Profile overlay"
                width={100}
                height={100}
                className="absolute bottom-4 left-4 rounded-full border-4 border-green-500"
              />
              <p className="absolute bottom-4 right-4 text-green-400 font-bold text-xl">
                Symbiotic
              </p>
            </div>
          )}
          {meme && (
            <>
              <Button
                onClick={downloadMeme}
                disabled={!avatar || loading}
                className="bg-black border border-green-500 text-green-400 font-bold w-full"
              >
                {loading ? 'Downloading...' : 'Download'}
              </Button>
              <TwitterShareButton
                text={shareText}
                url={meme}
                hashtags={hashtags}
              />{' '}
            </>
          )}
        </div>
      </div>

      {error && (
        <Alert className="text-red-800 fixed top-0" variant={'destructive'}>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Button
            size="sm"
            variant="ghost"
            className="pl-5"
            onClick={() => setError(null)}
          >
            Close
          </Button>
        </Alert>
      )}
    </div>
  )
}
