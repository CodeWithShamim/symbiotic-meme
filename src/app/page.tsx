// import GlitchText from '@/components/GlitchText'
import MemeForm from '@/components/MemeForm'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      {/* <GlitchText>SYMBIOTIC MEME GENERATOR</GlitchText> */}

      <div className="mb-4 animate-pulse">
        <Image
          src="/logo.png"
          alt="Symbiotic Logo"
          width={100}
          height={100}
          className="rounded-full border-4 border-green-500 shadow-lg"
        />
      </div>

      <h1 className="text-2xl font-bold text-center text-green-300">
        Symbiotic Meme Generator
      </h1>
      <div className="mt-8">
        <MemeForm />
      </div>
    </div>
  )
}
