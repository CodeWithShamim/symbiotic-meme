import GlitchText from '@/components/GlitchText'
import MemeForm from '@/components/MemeForm'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      {/* <GlitchText>SYMBIOTIC MEME GENERATOR</GlitchText> */}
      <p className="text-green-400 mt-2">
        Enter your X username and create instant memes ⚡
      </p>
      <div className="mt-8">
        <MemeForm />
      </div>
    </div>
  )
}
