"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Download, Github, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"
import SplitText from "../split-text"
import LetterGlitch from "../letter-glitch"
import DownloadCVButton from "../cv-button"
import Link from "next/link"
import Visitors from "../visitors"

// Utility: generate random id

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* LightRays background */}
      <div className="absolute inset-0 z-0">
        {/* <LightRays
          raysOrigin="top-center"
          raysColor="#000"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        /> */}
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
            <SplitText
              text="Mamdouh Mohammed"
              className="text-4xl font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 text-gray-200">
            <SplitText
              text="Front-End Developer"
              className="text-3xl font-bold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </p>

          <p className="text-lg sm:text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed font-bold">
            Crafting beautiful, responsive, and user-friendly web experiences
            with modern technologies
          </p>
          <Visitors />

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <DownloadCVButton />

            <div className="flex gap-4">
              <Link href="https://github.com/MamDouH919" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/mamdouh-mohammed/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`transition-all duration-1000 delay-500 ${isVisible ? "animate-fade-in" : "opacity-0"
            }`}
        >
          <button
            onClick={scrollToAbout}
            className="animate-bounce hover:animate-none transition-all duration-300 hover:text-primary"
            aria-label="Scroll to about section"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}
