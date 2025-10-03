// components/TwitterShareButton.tsx
import React from 'react'

interface TwitterShareButtonProps {
  text: string
  url?: string // optional link to share
  hashtags?: string[] // optional hashtags
}

const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({
  text,
  url = '',
  hashtags = [],
}) => {
  const handleShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
      hashtags.join(',')
    )}`
    window.open(shareUrl, '_blank', 'width=550,height=420')
  }

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
    >
      Share on Twitter
    </button>
  )
}

export default TwitterShareButton
